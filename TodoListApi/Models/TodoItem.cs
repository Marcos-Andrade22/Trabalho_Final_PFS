using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TodoListApi.Models
{
    public class TodoItem
    {
        [Required]

        public int Id { get; set; }

        [Required]

        public string Title { get; set; }
        public bool IsCompleted { get; set; }

        // Relacionamento 1:N
        public int CategoryId { get; set; } // Chave estrangeira

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
