using EcommerceAPI.RequestModels;
using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    [Route("Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly EcommerceContext _dbContext;
        public OrderController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<Order>> GetOrder(string userId)
        {
            var order = await _dbContext.Orders.
                Include(o => o.ShoppingCart).
                ThenInclude(sc => sc.ShoppingCartItems).
                ThenInclude(sci => sci.SubProductVariation).
                ThenInclude(spv => spv.ProductVariation).
                ThenInclude(pv => pv.Product).
                Include(o => o.ShoppingCart).
                ThenInclude(sc => sc.ShoppingCartItems).
                ThenInclude(sci => sci.SubProductVariation).
                ThenInclude(spv => spv.ProductVariation).
                ThenInclude(pv => pv.ProductImages).
                FirstOrDefaultAsync(o => o.UserId == userId);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);

        }

        [HttpPost]
        public async Task<ActionResult> AddOrder([FromBody] string userId)
        {
            if (userId == null)
                return BadRequest(ModelState);

            var shoppingCart = await _dbContext.ShoppingCarts
                .Include(sc => sc.ShoppingCartItems.Where(item => item.IsDeleted == false))
                .FirstOrDefaultAsync(sc => sc.UserId == userId);

            if (shoppingCart == null)
            {
                return BadRequest(ModelState);
            }

            var order = new Order
            {
                ShoppingCartId = shoppingCart.UserId,
                UserId = shoppingCart.UserId,
                TotalPrice = shoppingCart.TotalPrice,
                TotalQuantity = shoppingCart.TotalQuantity,
                DeliveryState = DeliveryState.Pending,
                PaymentMethod = PaymentMethod.Cash,
            };

            await _dbContext.Orders.AddAsync(order);
            await _dbContext.SaveChangesAsync();

            foreach (var item in shoppingCart.ShoppingCartItems)
            {
                item.IsDeleted = true;
            }

            await _dbContext.SaveChangesAsync();

            return Ok("Order has been placed successfully");
        }

    }
}
