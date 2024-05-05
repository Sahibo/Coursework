using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("ShoppingCart")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly EcommerceContext _dbContext;

        public ShoppingCartController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAllItems/{userId}")]
        public async Task<IActionResult> GetAllItems(string userId)
        {
            var shoppingCart = await _dbContext.ShoppingCarts
                .Include(cart => cart.ShoppingCartItems.Where(sci => sci.IsDeleted == false))
                    .ThenInclude(sci => sci.SubProductVariation)
                        .ThenInclude(spv => spv.ProductVariation)
                            .ThenInclude(pv => pv.Product) 
                .Include(cart => cart.ShoppingCartItems.Where(sci => sci.IsDeleted == false))
                    .ThenInclude(sci => sci.SubProductVariation)
                        .ThenInclude(spv => spv.ProductVariation)
                            .ThenInclude(pv => pv.ProductImages)
                .FirstOrDefaultAsync(cart => cart.UserId == userId);

            if (shoppingCart == null)
            {
                return NotFound("Shopping cart not found");
            }

            var shoppingCartItems = shoppingCart.ShoppingCartItems.ToList();

            return Ok(shoppingCartItems);
        }


    }
}