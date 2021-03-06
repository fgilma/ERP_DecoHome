﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Data;
using Newtonsoft.Json;

namespace ERP_DecoHome.Models
{
    public class State: IEntity
    {
        [Key]        
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual List<Order> Orders { get; set; }
    }
}
