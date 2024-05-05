namespace EcommerceDb.Models
{
    public class OrderProduct
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int ShoppingCartItemId { get; set; }
        public ShoppingCartItem ShoppingCartItem { get; set; }

        public ICollection<OrderStateHistory> StateHistories { get; set; }
    }
}