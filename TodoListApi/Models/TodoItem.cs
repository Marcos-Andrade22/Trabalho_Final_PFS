using System.Text.Json.Serialization;

namespace TodoListApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }

        // Relacionamento 1:N
        public int CategoryId { get; set; } // Chave estrangeira

        [JsonIgnore]
        public Category? Category { get; set; }
    }
}
