namespace EcommerceDb.Models
{
    public class ShoppingCart
    {
        //public int Id { get; set; }
        public short TotalQuantity { get; set; }
        public decimal TotalPrice { get; set; }
        //public bool IsDeleted { get; set; } = false;

        public string UserId { get; set; }
        public AspNetUser User { get; set; }

        public ICollection<ShoppingCartItem> ShoppingCartItems { get; set; }

        public ShoppingCart()
        {
            ShoppingCartItems = new List<ShoppingCartItem>();
        }
    }
}
