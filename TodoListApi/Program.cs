using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TodoListApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Configurar o banco SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurar autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "your-issuer",
            ValidAudience = "your-audience",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key"))
        };
    });

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
        builder.WithOrigins("http://localhost:5173") // Permite apenas essa origem (front-end)
               .AllowAnyMethod()  // Permite qualquer método HTTP (GET, POST, etc.)
               .AllowAnyHeader()); // Permite qualquer cabeçalho
});

// Outras configurações
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configura o CORS
app.UseCors("AllowFrontend");

// Configuração do Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication(); // Habilita autenticação
app.UseAuthorization();

app.MapControllers();

app.Run();
