using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Data;
using Newtonsoft.Json;

namespace ERP_DecoHome.Models
{
    public class Category: IEntity
    {   
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual List<Product> Products { get; set; }
    }
}
