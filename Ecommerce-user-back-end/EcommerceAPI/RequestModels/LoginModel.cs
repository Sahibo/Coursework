namespace EcommerceAPI.RequestModels
{
    public class LoginModel : RegisterModel
    {
        public bool RememberMe { get; set; } = true;
    }
}
