using Microsoft.AspNetCore.Mvc;
using TaskAPI.Model;
using BCrypt.Net;

namespace TaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public UserController()
        {
            _userRepository = new UserRepository(); // For quick setup, this is fine
        }

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_userRepository.EmailExists(user.Email))
            {
                return Conflict("Email is already in use.");
            }

            // Hash the password
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _userRepository.AddUser(user);

            // Return a success response with user information (excluding the password)
            return CreatedAtAction(nameof(SignUp), new { id = user.ID }, new { user.ID, user.Username, user.Email });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                // Log the errors for debugging
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors });
            }

            // Find the user by username
            var user = _userRepository.GetAllUsers().FirstOrDefault(u => u.Username == loginRequest.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            // Return a success response with user information (excluding the password)
            return Ok(new { message = "Login successful", user = new { user.ID, user.Username, user.Email } });
        }

    }
}
