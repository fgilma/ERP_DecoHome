using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;

namespace ERP_DecoHome.Data
{
    public class StateRepository : EfCoreRepository<State, ApplicationDbContext>
    {
        public StateRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
