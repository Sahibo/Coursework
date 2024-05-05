using Newtonsoft.Json;

namespace EcommerceDb.Models
{
	public enum Color
    {
        None,
        Multicolor,
        White,
        Black,
        Gray,
        Beige,
        Cream,
        Red,
        Burgundy,
        Purple,
        Pink,
        Blue,
        Azure,
        Yellow,
        Orange,
        Brown,
        Green,
        Turquoise,
        Khaki,
        Ecru,
        Gold,
        Silver,
    }
    public class ProductVariation
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public Color Color { get; set; }
        public bool IsDeleted { get; set; }

		public int ProductId { get; set; }

		public Product Product { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        public ICollection<SubProductVariation> SubProductVariations { get; set; }
    }
}