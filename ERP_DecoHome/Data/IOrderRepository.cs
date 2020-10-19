using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;

namespace ERP_DecoHome.Data
{
    public interface IOrderRepository
    {
        public IEnumerable<Order> GetOrders();
        public Order GetOrders(int id);
        public IEnumerable<Order> GetOrderByCustomer(string id);
        public IEnumerable SalesByDay();
        public IEnumerable SalesByCustomer();
        public IEnumerable SalesByCustomerId(int id);
        public IEnumerable SalesByEmployee();
    }  
}

