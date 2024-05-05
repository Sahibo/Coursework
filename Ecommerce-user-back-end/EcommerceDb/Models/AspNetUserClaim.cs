using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace EcommerceDb.Models;

[Table("AspNetUserClaims")]
[NotMapped]

public partial class AspNetUserClaim : IdentityUserClaim<string>
{

    public virtual AspNetUser User { get; set; } = null!;
}
