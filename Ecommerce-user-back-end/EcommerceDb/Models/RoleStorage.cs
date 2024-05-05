using Microsoft.AspNetCore.Identity;

namespace EcommerceDb.Models
{
	public static class RoleStorage
    {
        public static List<IdentityRole> Roles { get; private set; }

        static RoleStorage()
        {
            Roles = new List<IdentityRole>()
        {
            new IdentityRole("Admin"),
            new IdentityRole("Manager"),
            new IdentityRole("Employee"),
            new IdentityRole("User")
        };
        }
    }
}
