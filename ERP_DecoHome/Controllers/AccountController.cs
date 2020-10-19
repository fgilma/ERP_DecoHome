using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ERP_DecoHome.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ERP_DecoHome.Controllers
{

    [Produces("application/json")]
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<Employee> _userManager;
        private readonly SignInManager<Employee> _signInManager;
        private readonly IConfiguration _configuration;


        public AccountController(
            UserManager<Employee> userManager,
            SignInManager<Employee> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this._configuration = configuration;
        }


        // Login method
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserInfo userInfo)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(userInfo.Email, userInfo.Password, isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return BuildToken(userInfo);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return Unauthorized(ModelState);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // Generate token and returns token and expiration time
        private IActionResult BuildToken(UserInfo userInfo)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(7);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: "yourdomain.com",
               audience: "yourdomain.com",
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = expiration
            });

        }

        //Create user
        // POST
        [HttpPost]
        public async Task<IActionResult> PostAcount([FromBody] Employee user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _userManager.CreateAsync(user, user.Password);
            var model = new UserInfo { Password = user.Password, Email = user.Email };
            if (result.Succeeded)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest("Username or password invalid");
            }

        }

        // GET: api/account
        [HttpGet]
        public IEnumerable<Employee> GetUsers()
        {
            var users = _userManager.Users;
            return users.Include(o => o.Orders).ToList();
        }        

        // Get employee by username
        // GET: api/account/currentUser/user
        [Route("[action]/{user}")]
        [HttpGet]
        public Employee CurrentUser(string user)
        {
            var users = _userManager.Users;
            return users.FirstOrDefault(p => p.Email == user);
        }

        // Get employee by id
        // GET: api/account/id
        [HttpGet("{Id}")]
        public Employee GetEmployeeById(string id)
        {
            var users = _userManager.Users;
            return users.FirstOrDefault(p => p.Id == id);
        }
         
        [Route("CambioPassword")]
        [HttpGet]
        public async Task<IActionResult> CambioPassword(string id, string newPassword)
        {
            Employee user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return BadRequest("Not Found");
            }
            Console.WriteLine(user.Password);

            var result = await _userManager.ChangePasswordAsync(user, user.Password, newPassword);
            user.Password = newPassword;
            var result2 = await _userManager.UpdateAsync(user);


            if (result.Succeeded & result2.Succeeded)
            {

                return Ok();
            }
            else
            {
                return BadRequest("No Update");
            }
        }

    }   
}
