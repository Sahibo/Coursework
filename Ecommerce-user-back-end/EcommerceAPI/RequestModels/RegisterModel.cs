using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceAPI.RequestModels
{
    [NotMapped]
    public class RegisterModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
