using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP_DecoHome.Data
{
    public class DetailedOrderRepository : EfCoreRepository<DetailedOrder, ApplicationDbContext>, IDetailedOrderRepository
    {
        private readonly ApplicationDbContext _context;
        public DetailedOrderRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public DetailedOrder GetDetailedOrders(int id)
        {
            return _context.DetailedOrders.Include(p => p.Product)
                                        .ThenInclude(c => c.Category)
                                        .AsNoTracking()
                                        .FirstOrDefault(m => m.Id == id);
        }

        // get total cost, pvps, pvps+iva by order
        public decimal[] GetTotal(int id)
        {
            var data = _context.DetailedOrders.Where(p => p.OrderId == id); 
            var totalCost = data.Sum(x => x.TotalCost);
            var totalPvp = data.Sum(x => x.TotalPvp);
            var totalPvpIva = data.Sum(x => x.TotalPvpIva);
            return new[] { totalCost, totalPvp, totalPvpIva };

        }
       
        // items same order ID
        public IEnumerable<DetailedOrder> GetItemsByOrderId(int id)
        {
            return _context.DetailedOrders.Where(p => p.OrderId == id).Include(p => p.Product)
                .ThenInclude(c => c.Category)
                .ToList();
        }

        // Sales group by products 
        public IEnumerable BestSellingProducts()
        {
           var query = _context.DetailedOrders.GroupBy(c => c.Product.Name)
                 .Select(x => new { name = x.Key, value = x.Sum(x => x.TotalPvpIva) })
                 .OrderByDescending(x => x.value).Take(5);
            return query.ToList();
        }       
    }
}
