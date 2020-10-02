using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace ERP_DecoHome.Models
{
    public class Employee: IdentityUser
    {
        public string Name { get; set; }
        public string Surname1 { get; set; }
        public string Surname2 { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public string Rol { get; set; }

        public string Password { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Salary { get; set; }
       
       //[JsonIgnore]
       public List<Order> Orders { get; set; }
    }
}
