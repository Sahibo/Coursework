using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace EcommerceDb.Models;

[Table("AspNetRoleClaims")]
[NotMapped]

public partial class AspNetRoleClaim : IdentityRoleClaim<string>
{

    public virtual AspNetRole Role { get; set; } = null!;
}
