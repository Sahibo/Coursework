using System.ComponentModel.DataAnnotations;

namespace EcommerceDb.Models
{
	public enum DeliveryState
    {
        Pending,
        Shipped,
        Delivered,
        Cancelled
    }

    public enum PaymentMethod
    {
        Cash,
        Online
    }
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int TotalQuantity { get; set; }
        public decimal TotalPrice { get; set; }
        public DeliveryState DeliveryState { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

		public string UserId { get; set; }
        public AspNetUser User { get; set; }
    
        public string ShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
        public ICollection<OrderStateHistory> StateHistories { get; set; }


        //public ICollection<OrderProduct> OrderProducts { get; set; }

    }
}
