using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ERP_DecoHome.Models;

namespace ERP_DecoHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailedOrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DetailedOrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DetailedOrders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailedOrder>>> GetDetailedOrders()
        {
            return await _context.DetailedOrders.ToListAsync();
        }

        // GET: api/DetailedOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetailedOrder>> GetDetailedOrder(int id)
        {
            var detailedOrder = await _context.DetailedOrders.FindAsync(id);

            if (detailedOrder == null)
            {
                return NotFound();
            }

            return detailedOrder;
        }

        // PUT: api/DetailedOrders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetailedOrder(int id, DetailedOrder detailedOrder)
        {
            if (id != detailedOrder.Id)
            {
                return BadRequest();
            }

            _context.Entry(detailedOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailedOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DetailedOrders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DetailedOrder>> PostDetailedOrder(DetailedOrder detailedOrder)
        {
            _context.DetailedOrders.Add(detailedOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetailedOrder", new { id = detailedOrder.Id }, detailedOrder);
        }

        // DELETE: api/DetailedOrders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DetailedOrder>> DeleteDetailedOrder(int id)
        {
            var detailedOrder = await _context.DetailedOrders.FindAsync(id);
            if (detailedOrder == null)
            {
                return NotFound();
            }

            _context.DetailedOrders.Remove(detailedOrder);
            await _context.SaveChangesAsync();

            return detailedOrder;
        }

        private bool DetailedOrderExists(int id)
        {
            return _context.DetailedOrders.Any(e => e.Id == id);
        }
    }
}
