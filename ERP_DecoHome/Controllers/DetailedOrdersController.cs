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
    public class DetailedOrdersController : GenericController<DetailedOrder, DetailedOrderRepository>
    {
        private readonly DetailedOrderRepository _repository;
        public DetailedOrdersController(DetailedOrderRepository repository) : base(repository)
        {
            _repository = repository;
        }
        // GET: api/DetailedOrders/GetDetailedOrders/5
        [HttpGet("GetDetailedOrders/{id}")]
        public ActionResult<DetailedOrder> GetDetailedOrders(int id)
        {
            var result = _repository.GetDetailedOrders(id); // include orders, priority, employee
                        
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
        // Get totals of items with same order
        // GET: //api/DetailedOrders/GetTotal/1
        [Route("[action]/{id}")]
        [HttpGet]

        public ActionResult<Decimal> GetTotal(int id)
        {
            var result = _repository.GetTotal(id);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }        

        // Get items same order
        [Route("[action]/{id}")]
        [HttpGet]
        public ActionResult<IEnumerable<DetailedOrder>> GetItemsByOrderId(int id)
        {
            var result = _repository.GetItemsByOrderId(id);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
        // statistics: best selling products
        [Route("[action]")]
        [HttpGet]
        public ActionResult<IEnumerable> BestSellingProducts()
        {
            var result = _repository.BestSellingProducts();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
        
    }
}

