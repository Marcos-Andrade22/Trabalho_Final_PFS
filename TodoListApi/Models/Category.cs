namespace TodoListApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // Relacionamento 1:N
        public List<TodoItem> TodoItems { get; set; }
    }
}
