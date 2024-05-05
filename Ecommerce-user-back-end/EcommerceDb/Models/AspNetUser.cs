using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace EcommerceDb.Models
{
    [Table("AspNetUsers")]
    [NotMapped]
    public partial class AspNetUser : IdentityUser
    {
        public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();
        public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
        public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; set; } = new List<AspNetUserClaim>();
        public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; } = new List<AspNetUserLogin>();
        public virtual ICollection<AspNetUserToken> AspNetUserTokens { get; set; } = new List<AspNetUserToken>();
        public virtual ICollection<OnlinePayment> OnlinePayments { get; set; } = new List<OnlinePayment>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual ShoppingCart? ShoppingCart { get; set; }
        public virtual ICollection<AspNetRole> Roles { get; set; } = new List<AspNetRole>();
    }
}
