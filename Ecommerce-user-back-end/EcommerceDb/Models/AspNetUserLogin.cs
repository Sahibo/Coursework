using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace EcommerceDb.Models;

[Table("AspNetUserLogins")]
[NotMapped]

public partial class AspNetUserLogin : IdentityUserLogin<string>
{

    public virtual AspNetUser User { get; set; } = null!;
}
