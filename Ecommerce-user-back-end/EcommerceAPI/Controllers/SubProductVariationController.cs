using EcommerceDb.DbContexts;
using EcommerceDb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Controllers
{
    [ApiController]
    [Route("SubProductVariation")]
    public class SubProductVariationController : ControllerBase
    {
        private readonly EcommerceContext _dbContext;

        public SubProductVariationController(EcommerceContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SubProductVariation>> GetSubProductVariationById(int id)
        {
            var subProductVariation = await _dbContext.SubProductVariations
                .Where(spv => spv.IsDeleted == false)
                .Include(spv => spv.ProductVariation)
                .ThenInclude(pv => pv.Product)
                .Include(spv => spv.ProductVariation.ProductImages)
                .FirstOrDefaultAsync(spv => spv.Id == id);

            if (subProductVariation == null)
            {
                return NotFound();
            }

            return Ok(subProductVariation);
        }

        [HttpGet("ProductVariation/{id}")]
        public async Task<ActionResult<SubProductVariation>> GetSubProductVariationsByProductVariationId(int id)
        {
            var subProductVariations = await _dbContext.SubProductVariations
                .Where(spv => spv.IsDeleted == false)
                .Where(spv => spv.ProductVariationId == id)
                .Include(spv => spv.ProductVariation)
                .ThenInclude(pv => pv.Product)
                .Include(spv => spv.ProductVariation)
                .ThenInclude(pv => pv.ProductImages)
                .Include(spv => spv.ProductVariation.ProductImages).ToListAsync();

            if (subProductVariations == null)
            {
                return NotFound();
            }

            return Ok(subProductVariations);
        }

    }
}
