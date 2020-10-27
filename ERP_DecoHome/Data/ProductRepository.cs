using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP_DecoHome.Data
{
    public class ProductRepository : EfCoreRepository<Product, ApplicationDbContext>, IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public IEnumerable<string> GetCategories()
        {
            var query= _context.Products.Select(p => p.Category)
                                  .Distinct();
            return query.ToList();
        }
    }
}
