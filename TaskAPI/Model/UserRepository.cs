using System.Collections.Generic;
using System.Linq;
using TaskAPI.Model;

namespace TaskAPI.Model
{
    public class UserRepository
    {
        private static List<User> users = new List<User>();
        private static int nextId = 1;

        public List<User> GetAllUsers()
        {
            return users;
        }

        public User GetUserById(int id)
        {
            return users.FirstOrDefault(u => u.ID == id);
        }



        public bool EmailExists(string email)
        {
            return users.Any(u => u.Email == email);
        }

        public void AddUser(User user)
        {
            user.ID = nextId++;
            users.Add(user);
        }
    }
}
