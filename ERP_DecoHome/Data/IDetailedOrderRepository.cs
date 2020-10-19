using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;

namespace ERP_DecoHome.Data
{
    public interface IDetailedOrderRepository
    {
        public DetailedOrder GetDetailedOrders(int id);
        public decimal[] GetTotal(int id);
        public IEnumerable<DetailedOrder> GetItemsByOrderId(int id);
        public IEnumerable BestSellingProducts();        
    }
}
