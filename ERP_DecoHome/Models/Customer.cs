using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Data;

namespace ERP_DecoHome.Models
{
    public class Customer: IEntity
    {
        [Key]       
        public int Id { get; set; }
        public string Name { get; set; }
        public string Dni { get; set; }
        #nullable enable
        public string? Phone { get; set; }
        public string? EmailCustomer { get; set; }
        public string? Address { get; set; }
        public string? Number { get; set; }
        public string? Flat { get; set; }
        public string? Door { get; set; }
        public string? City { get; set; }
        public string? Region { get; set; }
        public string? Country { get; set; }
        public string? Zip { get; set; }

        #nullable disable
        // [JsonIgnore]
        public virtual List<Order> Orders { get; set; }
        
    }
}
