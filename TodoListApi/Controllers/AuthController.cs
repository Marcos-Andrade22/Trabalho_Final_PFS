using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoListApi.Data;
using TodoListApi.Models;
using Microsoft.EntityFrameworkCore; // Para consultas assíncronas
using BCrypt.Net; // Biblioteca BCrypt

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUser)
    {
        try
        {
            // Validações básicas
            if (string.IsNullOrWhiteSpace(registerUser.Username) || string.IsNullOrWhiteSpace(registerUser.Password))
            {
                return BadRequest("Username and password are required.");
            }

            // Se o Role não for fornecido, defina um valor default
            if (string.IsNullOrWhiteSpace(registerUser.Role))
            {
                registerUser.Role = "User"; // Definir um valor padrão
            }

            // Verifica se o usuário já existe
            if (await _context.Users.AnyAsync(u => u.Username == registerUser.Username))
            {
                return BadRequest("Username already exists.");
            }

            // Cria o usuário com a senha hasheada
            var user = new User
            {
                Username = registerUser.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(registerUser.Password),
                Role = registerUser.Role // Incluindo a Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Usuário registrado com sucesso!!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during registration: {ex.Message}");
            return StatusCode(500, "An internal error occurred.");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto login)
    {
        if (string.IsNullOrEmpty(login.Password))
        {
            return BadRequest("Password cannot be empty.");
        }

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
        {
            return Unauthorized("Invalid username or password");
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[] 
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = _configuration["JwtSettings:Issuer"],
            Audience = _configuration["JwtSettings:Audience"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { Token = tokenString });
    }
}
