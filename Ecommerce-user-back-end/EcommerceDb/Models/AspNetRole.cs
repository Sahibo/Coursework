using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceDb.Models
{
    [Table("AspNetRoles")]
    [NotMapped]

    public partial class AspNetRole : IdentityRole
    {

        public virtual ICollection<AspNetRoleClaim> AspNetRoleClaims { get; set; } = new List<AspNetRoleClaim>();
        public virtual ICollection<AspNetUser> Users { get; set; } = new List<AspNetUser>();
    }
}
