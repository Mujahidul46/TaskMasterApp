using TaskAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskAPI;
namespace EFCoreInMemoryDbDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        readonly ITaskRepository _taskRepository;
        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpPost("create_task")]
        public JsonResult createTask([FromForm] TaskAPI.Model.Task t)
        {
            _taskRepository.createTask(t);

            return new JsonResult("new task created ");
        }
        
        [HttpGet("get_task")]
        public JsonResult Get()
        {
            return new JsonResult(_taskRepository.getTasks());
        }



        [HttpGet("get_task/{id}")]
        public JsonResult GetTaskWithId(int id)
        {
            return new JsonResult(_taskRepository.getTasksid(id));
        }

        [HttpDelete("delete_task/{id}")]
        public JsonResult DeleteTask(int id)
        {
            TaskAPI.Model.Task task = _taskRepository.getTasksid(id);
            if (task == null)
            {
                return new JsonResult("Task not found") { StatusCode = 404 };
            }

            _taskRepository.deleteTask(task);
            return new JsonResult("Task deleted");
        }



        [HttpPut("update_task/{id}")]
        public JsonResult updateTask(int id, [FromBody] TaskAPI.Model.Task task)
        {
            var existingTask = _taskRepository.getTasksid(id);
            if (existingTask == null)
            {
                return new JsonResult("Task not found") { StatusCode = 404 };
            }

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.DueDate = task.DueDate;
            existingTask.Priority = task.Priority;
            existingTask.IsComplete = task.IsComplete;

            _taskRepository.updateTask(existingTask);

            return new JsonResult(existingTask);
        }



    }
}