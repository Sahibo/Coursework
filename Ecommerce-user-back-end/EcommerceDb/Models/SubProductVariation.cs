using Newtonsoft.Json;

namespace EcommerceDb.Models;

public class SubProductVariation
{
    public int Id { get; set; }
    public string Size { get; set; }
    public decimal Price { get; set; }
    public decimal TotalPrice { get; set; }
    public ushort Quantity { get; set; }
    public ushort Discount { get; set; }
    public bool IsDeleted { get; set; }

    public int ProductVariationId { get; set; }
    public ProductVariation ProductVariation { get; set; }

	public ShoppingCartItem ShoppingCartItem { get; set; }
    public ICollection<Favorite> Favorites { get; set; }



    //public ICollection<ProductImage> ProductImages { get; set; }
}