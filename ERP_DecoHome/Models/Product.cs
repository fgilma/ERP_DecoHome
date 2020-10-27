using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Data;
using ERP_DecoHome.Models.Enums;
using Newtonsoft.Json;

namespace ERP_DecoHome.Models
{
    public class Product: IEntity
    {
        [Key]        
        public int Id { get; set; }
        public string Name { get; set; }        
        public String Category { get; set; }
        public int Amount { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Cost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPvp { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPvpIva  {get; set;}

        [JsonIgnore]
        public virtual List<DetailedOrder> DetailedOrders { get; set; }
       
    }
}
