using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERP_DecoHome.Models;
using System.Collections;
using ERP_DecoHome.Data;

namespace ERP_DecoHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : GenericController<Order, OrderRepository>
    {
        private readonly OrderRepository _repository;

        public OrdersController(OrderRepository repository) : base(repository)
        {
            _repository = repository;
        }

        // GET: api/Orders/GetOrders
        [HttpGet("GetOrders")]
        public ActionResult<IEnumerable<Order>> GetOrders()
        {
            var result = _repository.GetOrders(); //include customer, employee
            return Ok(result);
        }


        // GET: api/Orders/GetOrders/5
        [HttpGet("GetOrders/{id}")]
        public ActionResult<Order> GetOrders(int id)
        {
            var result = _repository.GetOrders(id); //include customer, employee
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // DELETE: api/DeleteOrderItems/5
        [Route("[action]/{id}")]
        [HttpDelete]
        public ActionResult<Order> DeleteOrderItems(int id)
        {
            var result = _repository.DeleteOrderItems(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [Route("[action]/{id}")]
        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrderByCustomer(string id)
        {
            var result = _repository.GetOrderByCustomer(id);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Group sales by days
        [Route("[action]")]
        [HttpGet]
        public ActionResult<IEnumerable> SalesByDay()
        {
            var result = _repository.SalesByDay();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        // Group sales by customers
        [Route("[action]")]
        [HttpGet]
        public ActionResult<IEnumerable> SalesByCustomer()
        {
            var result = _repository.SalesByCustomer();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // sales by customer id
        [Route("[action]/{id}")]
        [HttpGet]
        public ActionResult<IEnumerable> SalesByCustomerId(int id)
        {
            var result = _repository.SalesByCustomerId(id);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
        // Group sales by employees
        [Route("[action]")]
        [HttpGet]
        public ActionResult<IEnumerable> SalesByEmployee()
        {
            var result = _repository.SalesByEmployee();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
