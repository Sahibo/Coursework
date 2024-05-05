namespace EcommerceDb.Models
{
    public class OrderStateHistory
    {
        public int Id { get; set; }
        public DeliveryState State { get; set; }
        public DateTime DateChanged { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}