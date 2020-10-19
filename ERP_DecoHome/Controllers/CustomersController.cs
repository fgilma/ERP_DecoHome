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
    public class CustomersController : GenericController<Customer, CustomerRepository>
    {
        private readonly CustomerRepository _repository;
        public CustomersController(CustomerRepository repository) : base(repository)
        {
            _repository = repository;
        }

        // GET: api/Customers/GetCustomers
        [HttpGet("GetCustomers")]
        public ActionResult<IEnumerable<Customer>> GetCustomers()
        {
            var result = _repository.GetCustomers(); // include orders
            return Ok(result);
        }

        // GET: api/Customers/GetCustomers/5
        [HttpGet("GetCustomers/{id}")]
        public ActionResult<Customer> GetCustomers(int id)
        {
            var result = _repository.GetCustomers(id); // include orders       
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}

