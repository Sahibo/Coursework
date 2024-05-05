using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("ShoppingCartItem")]
    public class ShoppingCartItemController : ControllerBase
    {
        private readonly EcommerceContext _dbContext;

        public ShoppingCartItemController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }

        // delete from cart
        // increase decrease

        [HttpPost("AddToCart/{userId}/{subProductVariationId}")] // add user id to body
        public async Task<IActionResult> AddItem(string userId, int subProductVariationId)
        {
            var user = await _dbContext.Users.FindAsync(userId);

            var shoppingCart = await _dbContext.ShoppingCarts.FindAsync(userId);

            if (user == null || shoppingCart == null)
            {
                return NotFound("User not found");
            }
            var subProductVariation = await _dbContext.SubProductVariations
                .Where(spv => spv.IsDeleted == false)
                .FirstOrDefaultAsync(spv => spv.Id == subProductVariationId);

            if (subProductVariation != null && subProductVariation.Quantity > 0)
            {

                var existingItem = await _dbContext.ShoppingCartItems
                    .Where(spi => spi.IsDeleted == false)
                    .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.SubProductVariationId == subProductVariationId);

                if (existingItem != null)
                {
                    existingItem.Quantity++;
                }
                else
                {

                    var newItem = new ShoppingCartItem
                    {
                        SubProductVariationId = subProductVariationId,
                        TotalPrice = subProductVariation.TotalPrice,
                        Quantity = 1,
                        ShoppingCartId = userId,
                    };

                    subProductVariation.Quantity -= 1;

                    _dbContext.ShoppingCartItems.Add(newItem);
                    shoppingCart.ShoppingCartItems.Add(newItem);
                    shoppingCart.TotalPrice += newItem.TotalPrice;
                    shoppingCart.TotalQuantity += newItem.Quantity;
                }
                await _dbContext.SaveChangesAsync();
                return Ok("Item added to cart successfully");
            }

            return NotFound("Doesn't exist or out of stock");

        }

        [HttpPost("DeleteFromCart/{userId}/{subProductVariationId}")]
        public async Task<IActionResult> DeleteItem(string userId, int subProductVariationId)
        {
            var user = await _dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found!");
            }

            var shoppingCartItem = await _dbContext.ShoppingCartItems.Where(spv => spv.IsDeleted == false)
                .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.SubProductVariationId == subProductVariationId);
            var shoppingCart = await _dbContext.ShoppingCarts.FindAsync(userId);

            if (shoppingCartItem != null && shoppingCart != null)
            {
                _dbContext.ShoppingCartItems.Remove(shoppingCartItem);
                shoppingCart.TotalPrice -= shoppingCartItem.TotalPrice;
                shoppingCart.TotalQuantity += shoppingCartItem.Quantity;
                await _dbContext.SaveChangesAsync();

                return Ok("Item removed from cart successfully");
            }

            return NotFound("Item not found in the cart!");
        }

        [HttpPost("Increase/{userId}/{subProductVariationId}")]

        public async Task<IActionResult> Increase(string userId, int subProductVariationId)
        {
            var user = await _dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found!");
            }

            var shoppingCartItem = await _dbContext.ShoppingCartItems.Where(spv => spv.IsDeleted == false)
                .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.SubProductVariationId == subProductVariationId);
            var shoppingCart = await _dbContext.ShoppingCarts.FindAsync(userId);
            var subProductVariation = await _dbContext.SubProductVariations
                .Where(spv => spv.IsDeleted == false)
                .FirstOrDefaultAsync(spv => spv.Id == subProductVariationId);
            if (subProductVariation != null)
            {

                if (shoppingCartItem != null && shoppingCart != null)
                {
                    shoppingCartItem.Quantity++;
                    shoppingCartItem.TotalPrice += subProductVariation.TotalPrice;
                    _dbContext.ShoppingCartItems.Update(shoppingCartItem);
                    shoppingCart.TotalQuantity -= 1;
                    shoppingCart.TotalPrice += shoppingCartItem.TotalPrice;
                    await _dbContext.SaveChangesAsync();

                    return Ok("Item's quantity increased successfully");
                }
                return NotFound("Item not found in the cart!");
            }
            return NotFound("Sub product var doesn't exist");
        }
        [HttpPost("Decrease/{userId}/{subProductVariationId}")]

        public async Task<IActionResult> Decrease(string userId, int subProductVariationId)
        {
            var user = await _dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found!");
            }

            var shoppingCartItem = await _dbContext.ShoppingCartItems
                .Where(spi => spi.IsDeleted == false)
                .FirstOrDefaultAsync(item => item.ShoppingCartId == userId && item.SubProductVariationId == subProductVariationId);
            var shoppingCart = await _dbContext.ShoppingCarts.FindAsync(userId);
            var subProductVariation = await _dbContext.SubProductVariations
                .Where(spv => spv.IsDeleted == false)
                .FirstOrDefaultAsync(spv => spv.Id == subProductVariationId);

            if (subProductVariation != null)
            {

                if (shoppingCartItem != null && shoppingCart != null && shoppingCartItem.Quantity > 1)
                {
                    shoppingCartItem.Quantity--;
                    shoppingCartItem.TotalPrice -= subProductVariation.TotalPrice;
                    _dbContext.ShoppingCartItems.Update(shoppingCartItem);
                    shoppingCart.TotalQuantity += 1;
                    shoppingCart.TotalPrice -= shoppingCartItem.TotalPrice;
                    await _dbContext.SaveChangesAsync();

                    return Ok("Item's quantity increased successfully");
                }
                return NotFound("Item not found in the cart!");
            }
            return NotFound("Sub product var doesn't exist");
        }
    }
}