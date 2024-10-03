using TaskAPI.Model;
using Microsoft.EntityFrameworkCore;
namespace TaskAPI
{

    public class TaskAPIContext : DbContext
    {


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "TaskDb");
        }

        public DbSet<TaskAPI.Model.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<TaskAPI.Model.Task>().HasData(
            //        new TaskAPI.Model.Task { Id = 1, Title = "Buy groceries", Description = "Milk, Bread, Eggs", DueDate = DateTime.Now.AddDays(1), Priority = "High" }
            //    );
        }
    }
}

