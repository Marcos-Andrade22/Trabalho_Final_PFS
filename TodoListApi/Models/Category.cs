using System.Text.Json.Serialization;

namespace TodoListApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // Relacionamento 1:N
        [JsonIgnore]
        public List<TodoItem>? TodoItems { get; set; }
    }
}
