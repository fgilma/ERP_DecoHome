using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;

namespace ERP_DecoHome.Data
{
    public class PriorityRepository : EfCoreRepository<Priority, ApplicationDbContext>
    {
        public PriorityRepository(ApplicationDbContext context) : base(context)
        {
        }

    }
}
