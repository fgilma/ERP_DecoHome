using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Data;

namespace ERP_DecoHome.Models
{
    public class DetailedOrder: IEntity
    {
        [Key]        
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int Amount { get; set; }   
                
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalCost { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPvp { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPvpIva { get; set; }
        public int ProductId { get; set; }


        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }
    }
}
