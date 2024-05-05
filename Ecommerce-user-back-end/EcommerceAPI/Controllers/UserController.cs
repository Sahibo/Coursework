using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Authorization;
using EcommerceAPI.RequestModels;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("User")]

    public class UserController : ControllerBase
    {
        [NotMapped]
        //[Route("User")]



        private readonly EcommerceContext _dbContext;
        private readonly UserManager<AspNetUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<AspNetUser> _signInManager;
        private readonly IUserStore<AspNetUser> _userStore;
        private readonly IConfiguration _configuration;

        // role manager add 
        public UserController(EcommerceContext dbContext,
            UserManager<AspNetUser> userManager,
            IUserStore<AspNetUser> userStore,
            RoleManager<IdentityRole> roleManager,
            SignInManager<AspNetUser> signInManager,
            IConfiguration configuration)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _userStore = userStore;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;

        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
                    if (result.Succeeded)
                    {
                        var tokenString = GenerateTokenString(user);
                        return Ok(new { UserId = user.Id, Token = tokenString });
                    }
                    return BadRequest("Invalid login attempt");
                }
            }
            return BadRequest("Not valid attempt");

        }


        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model state");
            }

            IActionResult emailCheckResult = CheckEmail(model.Email);
            if (emailCheckResult is BadRequestObjectResult)
            {
                return emailCheckResult;
            }

            IActionResult passwordCheckResult = CheckPassword(model.Password);
            if (passwordCheckResult is BadRequestObjectResult)
            {
                return passwordCheckResult;
            }

            if (await _dbContext.Users.AnyAsync(a => a.Email == model.Email))
            {
                return BadRequest("User already exists");
            }

            var newUser = new AspNetUser
            {
                Email = model.Email,
                NormalizedEmail = model.Email.ToUpper()
            };

            await _userStore.SetUserNameAsync(newUser, model.Email, CancellationToken.None);
            await _userManager.GetUserIdAsync(newUser);

            var result = await _userManager.CreateAsync(newUser, model.Password);

            if (result.Succeeded)
            {
                await CreateUserShoppingCart(newUser.Id);
                var tokenString = GenerateTokenString(newUser);
                await _userManager.AddToRoleAsync(newUser, _roleManager.Roles.FirstOrDefault(x => x.Name == "User").Name);
                await _dbContext.SaveChangesAsync();

                return Ok(new { UserId = newUser.Id, Token = tokenString });
            }

            return BadRequest("Registration failed");
        }


        [HttpGet("CheckEmail")]
        public IActionResult CheckEmail(string email)
        {
            if (Regex.IsMatch(email, "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
            {
                return Ok();
            }
            return BadRequest("Invalid email format");
        }


        [HttpGet("CheckPassword")]
        public IActionResult CheckPassword(string password)
        {
            if (Regex.IsMatch(password, "^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=-_'.!]).{6,40}$"))
            {
                return Ok();
            }
            return BadRequest("Password must be more than 6 and less than 40 characters long and special symbol");
        }


        [HttpPost("CreateUserShoppingCart/{userId}")]
        public async Task<IActionResult> CreateUserShoppingCart(string userId)
        {
            var userShoppingCart = new ShoppingCart
            {
                UserId = userId,
            };
            await _dbContext.ShoppingCarts.AddAsync(userShoppingCart);
            await _dbContext.SaveChangesAsync();

            return Ok("Shopping cart created successfully");
        }

        private string GenerateTokenString(AspNetUser user)
        {
            var claims = new List<Claim>();
            if (user.Email != "goldwolverinee@gmail.com")
            {

                claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Role,"User"),
            };
            }
            else
            {
                claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Role,"Admin"),
            };
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }

        [HttpPost("AddFavorite/{userId}/{subProductVariationId}/{productVariationid}/{productId}")]
        public async Task<IActionResult> AddFavById(string userId,
                                                    int subProductVariationId,
                                                    int productVariationid,
                                                    int productId)
        {
            var user = await _dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }
            var subProductVariation = await _dbContext.SubProductVariations.FindAsync(subProductVariationId);
            if (subProductVariation == null)
            {
                return NotFound("ProductVariation not found");
            }


            var existingFavorite = await _dbContext.Favorites
                .FirstOrDefaultAsync(f => f.UserId == user.Id && f.SubProductVariationId == subProductVariationId);

            if (existingFavorite != null)
            {
                return BadRequest("Favorite is already added");

            }

            var newFavorite = new Favorite
            {
                UserId = user.Id,
                SubProductVariationId = subProductVariationId,
                ProductVariationId = productVariationid,
                ProductId = productId
            };

            _dbContext.Favorites.Add(newFavorite);
            await _dbContext.SaveChangesAsync();
            return Ok("Favorite added successfully");
        }

        [HttpPost("DeleteFavorite/{userId}/{subProductVariationId}")]
        public async Task<IActionResult> DeleteFavById(string userId, int subProductVariationId)
        {
            var user = await _dbContext.Users.FindAsync(Convert.ToString(userId));

            if (user == null)
            {
                return NotFound("User not found");
            }

            var favoriteToDelete = await _dbContext.Favorites
                .FirstOrDefaultAsync(f => f.UserId == user.Id && f.SubProductVariationId == subProductVariationId);

            if (favoriteToDelete == null)
            {
                return NotFound("Favorite not found");
            }

            _dbContext.Favorites.Remove(favoriteToDelete);
            await _dbContext.SaveChangesAsync();

            return Ok("Favorite deleted successfully");
        }

        [HttpPost("ShowFavorites/{userId}")]

        public async Task<IActionResult> ShowFavorites(string userId)
        {
            Console.WriteLine(userId);
            var user = await _dbContext.Users
                .Include(u => u.Favorites)
                .FirstOrDefaultAsync(u => u.Id == Convert.ToString(userId));


            //Show products if product.productvar == favorites.productVarId

            if (user == null)
            {
                return NotFound("User not found");
            }

            var favorites = user.Favorites;
            return Ok(favorites);
        }

        [HttpPost("AddUserAddress/{userId}")]
        public async Task<IActionResult> AddUserAddress(string userId, [FromBody] AddressModel address)
        {
            var user = await _dbContext.Users
            .Include(u => u.Addresses)
            .FirstOrDefaultAsync(u => u.Id == Convert.ToString(userId));

            if (user == null)
            {
                return NotFound("User not found");
            }

            var newAddress = new Address
            {
                FirstName = address.FirstName,
                LastName = address.LastName,
                UserId = userId,
                City = address.City,
                Country = address.Country,
                PhoneNumber = address.PhoneNumber,
                ZIP = address.ZIP,
                Region = address.Region,
                StreetAddress = address.StreetAddress,
                StreetAddressSecond = address.StreetAddressSecond,
            };

            // Maybe we will fix that

            _dbContext.Addresses.Add(newAddress);
            await _dbContext.SaveChangesAsync();
            return Ok("Address is added");

        }

    }
}