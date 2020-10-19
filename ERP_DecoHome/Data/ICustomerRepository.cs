using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;

namespace ERP_DecoHome.Data
{
    public interface ICustomerRepository
    {
        public IEnumerable<Customer> GetCustomers();
        public Customer GetCustomers(int id);
    }
}
