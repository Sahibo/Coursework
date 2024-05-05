using System.ComponentModel.DataAnnotations;

namespace EcommerceDb.Models
{
	public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public int ParentCategoryId { get; set; }
        public ParentCategory ParentCategory { get; set; } = null!;

        public ICollection<Product>? Products { get; set; }
    }

}
