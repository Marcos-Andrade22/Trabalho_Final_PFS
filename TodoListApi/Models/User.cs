using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Models
{
    public class User
    {
        [Required]

        public int Id { get; set; }

        [Required]

        public string Username { get; set; }

        [Required]

        public string Password { get; set; } // De preferência, armazene senhas como hashes

        [Required]

        public string Role { get; set; } // e.g., "Admin" ou "User"
    }
}
