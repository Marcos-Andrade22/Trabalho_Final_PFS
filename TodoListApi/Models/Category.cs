using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TodoListApi.Models
{
    public class Category
    {

        [Required]

        public int Id { get; set; }

        [Required]

        public string Name { get; set; }

        // Relacionamento 1:N
        [JsonIgnore]
        public List<TodoItem>? TodoItems { get; set; }
    }
}
