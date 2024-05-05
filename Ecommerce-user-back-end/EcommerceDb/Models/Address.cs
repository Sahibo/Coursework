
using System.Text.Json.Serialization;

namespace EcommerceDb.Models
{
    public class Address
    {
        public int Id { get; set; }
    
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PhoneNumber { get; set; }
    
        public string Country { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string StreetAddress { get; set; }
        public string? StreetAddressSecond { get; set; }
        public string ZIP { get; set; }
    

        public string UserId { get; set; }

        public AspNetUser User { get; set; }
    }
}