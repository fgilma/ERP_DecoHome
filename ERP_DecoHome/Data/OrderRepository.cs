using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP_DecoHome.Data
{
    public class OrderRepository : EfCoreRepository<Order, ApplicationDbContext>, IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        public OrderRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders.Include(i => i.Priority)
                                     .Include(r => r.Customer)
                                     .Include(e => e.Employee)
                                     .Include(s => s.State)
                                     .ToList();
        }
        public Order GetOrders(int id)
        {
            return _context.Orders.Include(o => o.Customer)
                                  .Include(e => e.Employee)
                                  .AsNoTracking()
                                  .FirstOrDefault(m => m.Id == id);
        }

        //delete order and its items
        public Order DeleteOrderItems(int id)
        {
            var order = _context.Orders.Find(id);
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                _context.DetailedOrders.RemoveRange(_context.DetailedOrders.Where(o => o.OrderId == id));
                _context.SaveChanges();
                _context.Orders.Remove(_context.Orders.FirstOrDefault(o => o.Id == id));
                _context.SaveChanges();
                transaction.Commit();
                return order;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                transaction.Rollback();
                return null;
            }
        }

        public IEnumerable<Order> GetOrderByCustomer(string id)
        {
            return _context.Orders.Where(p => p.EmployeeId == id)
                .Include(o => o.Customer)
                .Include(o => o.Priority)
                .Include(o => o.State)
                .ToList();
        }
        // Group sales by day
        public IEnumerable SalesByDay()
        {
            var query = _context.Orders.GroupBy(c => c.StartDate.Date)

                 .Select(x => new { name = x.Key.ToString("dd-MM-yyyy"), value = x.Sum(x => x.TotalPvpIva) });
            return query.ToList().TakeLast(7);
        }

        //Group sales by customer
        public IEnumerable SalesByCustomer()
        {
            var query = _context.Orders.Where(x => x.TotalPvpIva != null);
            var query1 = query.GroupBy(c => c.Customer.Name)
                 .Select(x => new { name = x.Key, value = x.Sum(x => x.TotalPvpIva) })
                  .OrderByDescending(x => x.value).Take(4); ;
            return query1.ToList();
        }

        //TotalPvp by customer id
        public IEnumerable SalesByCustomerId(int id)
        {
            var query = _context.Orders.Where(c => c.CustomerId == id);
            var query1 = query.GroupBy(c => c.CustomerId)
                 .Select(x => new { name = x.Key, value = x.Sum(x => x.TotalPvpIva) });

            return query1.ToList();
        }

        //Group sales by employee
        public IEnumerable SalesByEmployee()
        {
            var query = _context.Orders.Where(x => x.TotalPvpIva != null && x.Employee.Name != null);
            var query2 = query.GroupBy(c => new { c.EmployeeId, c.Employee.Name, c.Employee.Surname1, c.Employee.Surname2 })
                .Select(x => new { Id = x.Key.EmployeeId, Name = x.Key.Name + " " + x.Key.Surname1 + " " + x.Key.Surname2, value = x.Sum(x => x.TotalPvpIva) });
            return query2.ToList();

        }
    }
}
