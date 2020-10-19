using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;

namespace ERP_DecoHome.Data
{
    public class CategoryRepository : EfCoreRepository<Category, ApplicationDbContext>
    {
        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
