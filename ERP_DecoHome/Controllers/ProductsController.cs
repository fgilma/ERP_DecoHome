using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERP_DecoHome.Models;
using ERP_DecoHome.Data;

namespace ERP_DecoHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : GenericController<Product, ProductRepository>
    {
        private readonly ProductRepository _repository;

        public ProductsController(ProductRepository repository) : base(repository)
        {
            _repository = repository;

        }

        // GET: api/Products
        [HttpGet("GetProducts")]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            var result = _repository.GetProducts(); // include categories
            return Ok(result);
        }
    }
}
