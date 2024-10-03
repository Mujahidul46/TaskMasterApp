namespace TaskAPI.Model
{
    public class Task
    {
        public int Id { get; set; }

        // Required field
        public string Title { get; set; }

        // Optional field
        public string? Description { get; set; }

        public DateTime? DueDate { get; set; }

        public string? Priority { get; set; }

        public bool IsComplete { get; set; }

        public DateTime? CompletedDate { get; set; } 
    }
}
