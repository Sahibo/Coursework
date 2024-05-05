using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace EcommerceDb.Models;

[Table("AspNetUserTokens")]
[NotMapped]

public partial class AspNetUserToken : IdentityUserToken<string>
{


    public virtual AspNetUser User { get; set; } = null!;
}