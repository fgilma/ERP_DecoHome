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
    public class CategoriesController : GenericController<Category, CategoryRepository>
    {        
        public CategoriesController(CategoryRepository repository) : base(repository)
        {
        }
    }
}