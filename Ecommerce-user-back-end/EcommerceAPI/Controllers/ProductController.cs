using System.Linq;
using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("Product")]
    public class ProductController : ControllerBase
    {

        private readonly EcommerceContext _dbContext;

        public ProductController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _dbContext.Products
                .Where(p => p.IsDeleted == false && p.ProductVariations.Any())
                .Include(p => p.ProductVariations
                    .Where(pv => pv.IsDeleted == false && pv.ProductImages.Any() && pv.SubProductVariations.Any()))
                    .ThenInclude(pv => pv.ProductImages)
                .Include(p => p.ProductVariations
                    .Where(pv => pv.IsDeleted == false && pv.ProductImages.Any() && pv.SubProductVariations.Any()))
                    .ThenInclude(pv => pv.SubProductVariations
                    .Where(spv => spv.IsDeleted == false))
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("Gender/{gender}")]
        public async Task<ActionResult<List<Product>>> GetProductsByGender(Gender gender)
        {
            Console.WriteLine(gender);
            var products = await _dbContext.Products
                .Where(p => p.Category.ParentCategory.Gender == gender && p.IsDeleted == false && p.ProductVariations.Any())
                .Include(p => p.ProductVariations
                    .Where(pv => pv.IsDeleted == false && pv.ProductImages.Any() && pv.SubProductVariations.Any()))
                    .ThenInclude(pv => pv.ProductImages)
                .Include(p => p.ProductVariations
                    .Where(pv => pv.IsDeleted == false && pv.ProductImages.Any() && pv.SubProductVariations.Any()))
                    .ThenInclude(pv => pv.SubProductVariations
                    .Where(spv => spv.IsDeleted == false))
                .ToListAsync();

            if (!products.Any())
            {
                return NotFound();
            }

            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var productVariations = await _dbContext.ProductVariations
                .Where(pv => pv.ProductId == id).ToListAsync();

            var product = await _dbContext.Products
                .Include(p => p.ProductVariations)
                    .ThenInclude(pv => pv.ProductImages)
                .Include(p => p.ProductVariations)
                    .ThenInclude(pv => pv.SubProductVariations)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            product.ProductVariations = productVariations;

            return Ok(product);
        }


        [HttpGet("{id}/ProductVariations")]
        public async Task<ActionResult<List<Product>>> GetAllProductVariationsByProductId(int id)  
        {
            var productVariations = await _dbContext.ProductVariations.Where(pv => pv.ProductId == id).
                Include(pv => pv.Product).
                Include(pv => pv.ProductImages).ToListAsync();

            return Ok(productVariations);
        }


        [HttpGet("Category/{id}")]
        public async Task<ActionResult<List<Product>>> GetProductsByCategoryId(int id)
        {
            var products = await _dbContext.Products
                .Where(p => p.Category.Id == id && p.IsDeleted == false && p.ProductVariations.Any())
                .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
                    .ThenInclude(pv => pv.ProductImages)
                .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
                    .ThenInclude(pv => pv.SubProductVariations.Where(spv => spv.IsDeleted == false))
                .ToListAsync();

            if (!products.Any())
            {
                return NotFound();
            }

            return Ok(products);
        }

        [HttpGet("ParentCategory/{id}")]
        public async Task<ActionResult<List<Product>>> GetProductsByParentCategoryId(int id)
        {
            var products = await _dbContext.Products
                .Where(p => p.Category.ParentCategory.Id == id && p.IsDeleted == false && p.ProductVariations.Any())
                .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
                    .ThenInclude(pv => pv.ProductImages)
                .Include(p => p.ProductVariations.Where(pv => pv.IsDeleted == false))
                    .ThenInclude(pv => pv.SubProductVariations.Where(spv => spv.IsDeleted == false))
                    .Include(p => p.ProductVariations)
                .ToListAsync();

            if (!products.Any())
            {
                return NotFound();
            }

            return Ok(products);
        }




    }
}
