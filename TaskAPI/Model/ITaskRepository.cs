namespace TaskAPI.Model
{
    public interface ITaskRepository
    {

        public List<TaskAPI.Model.Task> getTasks();
        public TaskAPI.Model.Task getTasksid(int id);
        void createTask(TaskAPI.Model.Task model);
        void updateTask(TaskAPI.Model.Task model);
        void deleteTask(TaskAPI.Model.Task model);

    }
}
