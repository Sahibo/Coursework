using EcommerceDb.DbContexts;
using EcommerceDb.Models;
 using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.EntityFrameworkCore;
  
 namespace EcommerceAPI.Controllers
 {
     [ApiController]
     [Route("ParentCategory")]
     public class ParentCategoryApiController : ControllerBase
     {
         private readonly EcommerceContext _dbContext;
  
         public ParentCategoryApiController(EcommerceContext dbContext)
         {
             _dbContext = dbContext;
         }
  
         [HttpGet("")]
         public async Task<ActionResult<List<ParentCategory>>> GetParentCategories() // Test it
         {
             var parentCategories = await _dbContext.ParentCategories
                 .Where(pc => pc.IsDeleted == false)
                 .Include(pc => pc.Categories
                     .Where(c => c.IsDeleted == false && c.Products
                         .Any(p => p.IsDeleted == false && p.ProductVariations
                             .Any(pv => pv.IsDeleted == false && pv.ProductImages.Any() && pv.SubProductVariations.Any(spv => spv.IsDeleted == false)))))
                 .ToListAsync();

             return Ok(parentCategories);
         }
  
         [HttpGet("{id}")]
         public async Task<ActionResult<ParentCategory>> GetParentCategoryById(int id)
         {
             var parentCategory = await _dbContext.ParentCategories.FindAsync(id);
  
             if (parentCategory == null)
             {
                 return NotFound();
             }
  
             return Ok(parentCategory);
         }
         
         [HttpGet("Gender/{gender}")]
         public async Task<ActionResult<List<ParentCategory>>> GetParentCategoriesByGender(Gender gender)
         {
             var parentCategories = await _dbContext.ParentCategories
                 .Where(pc => pc.IsDeleted == false && pc.Gender == gender && pc.Categories
                     .Any(c => c.IsDeleted == false && c.Products
                         .Any(p => p.IsDeleted == false && p.ProductVariations
                             .Any(pv => pv.IsDeleted == false))))
                 .Include(pc => pc.Categories
                     .Where(c => c.IsDeleted == false && c.Products
                         .Any(p => p.IsDeleted == false && p.ProductVariations
                             .Any(pv => pv.IsDeleted == false))))
                 .ToListAsync();
             
             return Ok(parentCategories);
         }
     }
 }