using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ERP_DecoHome.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? AssignDate { get; set; }
        public DateTime? EndDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalCost { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalPvp { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalPvpIva { get; set; }
        #nullable enable
        public string? EmployeeId { get; set; }
        public int? CustomerId { get; set; }
        public int StateId { get; set; }
        public int PriorityId { get; set; }
        #nullable enable
        public string? Address { get; set; }
        #nullable enable
        public string? Number { get; set; }
        public string? Flat { get; set; }
        public string? Door { get; set; }
        public string? City { get; set; }
        public string? Region { get; set; }
        public string? Country { get; set; }
        public string? Zip { get; set; }

        #nullable disable
        public virtual List<DetailedOrder> DetailedOrders { get; set; }
        public virtual Customer Customer { get; set; }
        
        public virtual Employee Employee { get; set; }
        public virtual State State { get; set; }
        public virtual Priority Priority { get; set; }
    }   
}
