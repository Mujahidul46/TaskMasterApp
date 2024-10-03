
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace TaskAPI.Model
{
    public class TaskRepository : ITaskRepository
    {


        TaskAPIContext context = null;
        public TaskRepository() 
        {
           
        }

        public List<TaskAPI.Model.Task> getTasks()
        {
            using (var context = new TaskAPIContext())
            {
                context.Database.EnsureCreated();
                var list = context.Tasks.ToList();
                return list;
            }
        }
        
        public TaskAPI.Model.Task getTasksid(int id)
        {
            using (var context = new TaskAPIContext())
            {
                var list = context.Tasks.Find(id);
                return list;
            }
        }

        public void createTask(TaskAPI.Model.Task model)
        {
            using (var context = new TaskAPIContext())
            {
                context.Tasks.Add(model);
                context.SaveChanges();

            }
        }
        public void updateTask(TaskAPI.Model.Task task)
        {
            using (var context = new TaskAPIContext())
            {
                var existingTask = context.Tasks.Find(task.Id);
                if (existingTask != null)
                {
                    existingTask.Title = task.Title;
                    existingTask.Description = task.Description;
                    existingTask.DueDate = task.DueDate;
                    existingTask.Priority = task.Priority;
                    existingTask.IsComplete = task.IsComplete;

                    existingTask.CompletedDate = task.IsComplete ? DateTime.Now : (DateTime?)null;

                    context.SaveChanges();
                }
            }
        }


        public void deleteTask(TaskAPI.Model.Task task)
        {
            using (var context = new TaskAPIContext())
            {

                context.Tasks.Remove(task);
                context.SaveChanges();


            }
        }


    }
}
