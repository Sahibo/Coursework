using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("ProductVariation")]
    public class ProductVariationController : ControllerBase
    {

        private readonly EcommerceContext _dbContext;

        public ProductVariationController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductVariation>>> GetAllProductVariations()
        {
            var productVariations = await _dbContext.ProductVariations
                .Where(pv => pv.IsDeleted == false)
                .Include(pv => pv.Product)
                .ThenInclude(pv => pv.Category)
                .Include(pv => pv.SubProductVariations)
                .Include(pv => pv.ProductImages).ToListAsync();

            if (!productVariations.Any())
            {
                return NotFound();
            }
            return Ok(productVariations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductVariation>> GetProductVariationById(int id)
        {
            var productVariation = await _dbContext.ProductVariations
                .Where(pv => pv.IsDeleted == false)
                .Include(pv => pv.Product)
                .ThenInclude(pv => pv.Category)
                .Include(pv => pv.SubProductVariations)
                .Include(pv => pv.ProductImages)
                .FirstOrDefaultAsync(pv => pv.Id == id);

            if (productVariation == null)
            {
                return NotFound();
            }
            return Ok(productVariation);
        }

        [HttpGet("Product/{id}")]
        public async Task<ActionResult<List<ProductVariation>>> GetAllVariationsByProductId(int id)
        {
            var productVariations = await _dbContext.ProductVariations
                .Include(pv => pv.ProductImages)
                .Where(pv => pv.IsDeleted == false)
                .Where(p => p.ProductId == id)
                .ToListAsync();

            if (productVariations == null)
            {
                return NotFound();
            }
            return Ok(productVariations);
        }

    }
}