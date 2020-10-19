using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP_DecoHome.Data
{
    public class CustomerRepository : EfCoreRepository<Customer, ApplicationDbContext>, ICustomerRepository
    {
        private readonly ApplicationDbContext _context;
        public CustomerRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Customers.Include(s => s.Orders).ToList();
        }
        public Customer GetCustomers(int id)
        {
            return _context.Customers.Include(o => o.Orders)
                                                    .ThenInclude(p => p.Priority)
                                                    .Include(o => o.Orders)
                                                    .ThenInclude(s => s.State)
                                                    .Include(o => o.Orders)
                                                    .ThenInclude(s => s.Employee)
                                                    .AsNoTracking()
                                                   .FirstOrDefault(m => m.Id == id);
        }
    }
}
