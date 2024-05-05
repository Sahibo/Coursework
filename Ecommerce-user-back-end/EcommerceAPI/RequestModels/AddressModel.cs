using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceAPI.RequestModels
{
    [NotMapped]
    public class AddressModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PhoneNumber { get; set; }

        public string Country { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string StreetAddress { get; set; }
        public string? StreetAddressSecond { get; set; }
        public string ZIP { get; set; }

    }
}
