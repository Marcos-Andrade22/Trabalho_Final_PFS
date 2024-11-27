namespace TodoListApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } // De preferência, armazene senhas como hashes
        public string Role { get; set; } // e.g., "Admin" ou "User"
    }
}
