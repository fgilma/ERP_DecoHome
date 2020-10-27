using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP_DecoHome.Models.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ERP_DecoHome.Models
{
    public class ApplicationDbContext: IdentityDbContext<Employee>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
             : base(options)
        {
        }

        // public virtual DbSet<Category2> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Priority> Priorities { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<DetailedOrder> DetailedOrders { get; set; }

       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // save db table names in singular and seed data
            // modelBuilder.Entity<Category2>().ToTable("Category");
            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Priority>().ToTable("Priority");
            modelBuilder.Entity<State>().ToTable("State");
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Order>().ToTable("Order");
            modelBuilder.Entity<DetailedOrder>().ToTable("DetailedOrder");

            base.OnModelCreating(modelBuilder);
            // Category
            /*modelBuilder.Entity<Category2>()
                .HasData(
                    new Category2() { Id = 1, Name = "Camas" },
                    new Category2() { Id = 2, Name = "Armarios" },
                    new Category2() { Id = 3, Name = "Sofás" },
                    new Category2() { Id = 4, Name = "Estanterías" },
                    new Category2() { Id = 5, Name = "Mesas" }
                );*/
            // Product
            modelBuilder.Entity<Product>()
                .HasData(
                    new Product() { Id = 1, Name = "Cama nido", Category = Category.Camas.ToString(), Amount = 100, Cost = 185.00M, UnitPvp = 240.50M, UnitPvpIva = 291.00M },
                    new Product() { Id = 2, Name = "Cama apilable", Category = Category.Camas.ToString(), Amount = 9, Cost = 85.00M, UnitPvp = 110.50M, UnitPvpIva = 133.71M },
                    new Product() { Id = 3, Name = "Colchón espuma", Category = Category.Camas.ToString(), Amount = 100, Cost = 45, UnitPvp = 58.50M, UnitPvpIva = 70.79M },
                    new Product() { Id = 4, Name = "Armario con puertas correderas", Category = Category.Armarios.ToString(), Amount = 100, Cost = 75, UnitPvp = 97.5M, UnitPvpIva = 117.97M },
                    new Product() { Id = 5, Name = "Armario abierto", Category = Category.Armarios.ToString(), Amount = 35, Cost = 105, UnitPvp = 136.5M, UnitPvpIva = 165.17M },
                    new Product() { Id = 6, Name = "Combinación armario", Category = Category.Armarios.ToString(), Amount = 6, Cost = 375, UnitPvp = 487.50M, UnitPvpIva = 589.87M },
                    new Product() { Id = 7, Name = "Sofá 2 plazas", Category = Category.Sofás.ToString(), Amount = 50, Cost = 390, UnitPvp = 507, UnitPvpIva = 613.47M },
                    new Product() { Id = 8, Name = "Sofá 3 plazas", Category = Category.Sofás.ToString(), Amount = 100, Cost = 790, UnitPvp = 1027, UnitPvpIva = 1242.67M },
                    new Product() { Id = 9, Name = "Sofá cama 3 plazas", Category = Category.Sofás.ToString(), Amount = 75, Cost = 850, UnitPvp = 1105, UnitPvpIva = 1337.05M },
                    new Product() { Id = 10, Name = "Estantería de cubos", Category = Category.Estanterías.ToString(), Amount = 100, Cost = 50, UnitPvp = 65, UnitPvpIva = 78.65M },
                    new Product() { Id = 11, Name = "Estantería de pared", Category = Category.Estanterías.ToString(), Amount = 80, Cost = 30, UnitPvp = 39, UnitPvpIva = 47.19M },
                    new Product() { Id = 12, Name = "Estantería con puertas", Category = Category.Estanterías.ToString(), Amount = 100, Cost = 25, UnitPvp = 32.50M, UnitPvpIva = 39.32M },
                    new Product() { Id = 13, Name = "Mesa de jardín", Category = Category.Mesas.ToString(), Amount = 40, Cost = 19, UnitPvp = 24.70M, UnitPvpIva = 29.89M },
                    new Product() { Id = 14, Name = "Mesa de despacho", Category = Category.Mesas.ToString(), Amount = 3, Cost = 190, UnitPvp = 247, UnitPvpIva = 298.87M },
                    new Product() { Id = 15, Name = "Mesa de cocina", Category = Category.Mesas.ToString(), Amount = 100, Cost = 110, UnitPvp = 143, UnitPvpIva = 173.03M }
                );
            // Customer
            modelBuilder.Entity<Customer>()
                .HasData(
                    new Customer() { Id = 1, Name = "Decoración La Finca", Dni = "44103145-T", Phone = "669252525", EmailCustomer = "lafinca@gmail.com", Address = "Calle Francia", Number = "105", Flat = "1", Door = "1", City = "Madrid", Region = "Madrid", Country = "España", Zip = "05906" },
                    new Customer() { Id = 2, Name = "Cocinas Arguiñano", Dni = "38184205-S", Phone = "656231212", EmailCustomer = "cocinasargui@gmail.com", Address = "Avenida America", Number = "22", Flat = "2", Door = "1", City = "Sevilla", Region = "Andalucía", Country = "España", Zip = "04356" },
                    new Customer() { Id = 3, Name = "Despacho Abogados de Oficio", Dni = "22103326-G", Phone = "669264141", EmailCustomer = "dao@gmail.com", Address = "Rambla Marina", Number = "3", Flat = "", Door = "", City = "Valencia", Region = "Valencia", Country = "España", Zip = "02564" },
                    new Customer() { Id = 4, Name = "Escuela Cervantes", Dni = "56237501-A", Phone = "623123456", EmailCustomer = "cervantes@gmail.com", Address = "Calle Sepulveda s/n", Number = "", Flat = "", Door = "", City = "Pontevedra", Region = "Galicia", Country = "España", Zip = "07652" },
                    new Customer() { Id = 5, Name = "Banco Sin Blanca", Dni = "22356210-L", Phone = "600654321", EmailCustomer = "sinblanca@gmail.com", Address = "Calle Paris", Number = "41", Flat = "40", Door = "3", City = "Zaragoza", Region = "Aragón", Country = "España", Zip = "06589" }
                );
            // Priority
            modelBuilder.Entity<Priority>()
               .HasData(
                    new Priority() { Id = 1, Name = "Normal" },
                    new Priority() { Id = 2, Name = "Urgente" },
                    new Priority() { Id = 3, Name = "Muy urgente" }
                );
            // State
            modelBuilder.Entity<State>()
               .HasData(
                    new State() { Id = 1, Name = "Pendiente" },
                    new State() { Id = 2, Name = "En tratamiento" },
                    new State() { Id = 3, Name = "En reparto" },
                    new State() { Id = 4, Name = "Finalizado" },
                    new State() { Id = 5, Name = "Cancelado" }
                );
            // Order
            modelBuilder.Entity<Order>()
                .HasData(
                    new Order() { Id = 1, StartDate = System.DateTime.Parse("2020-08-10"), AssignDate = System.DateTime.Parse("2020-08-11"), EndDate = System.DateTime.Parse("2020-08-15"), TotalCost = 710, TotalPvp = 923.00M, TotalPvpIva = 1116.83M, EmployeeId = "a18be9c0-aa65-4af8-bd17-00bd9344e575", CustomerId = 1, StateId = 1, PriorityId = 1 }
                );
            //DetailedOrder
            modelBuilder.Entity<DetailedOrder>()
                .HasData(
                   new DetailedOrder() { Id = 1, OrderId = 1, ProductId = 1, Amount = 1, TotalCost = 185.00M, TotalPvp = 240.50M, TotalPvpIva = 291.00M },
                   new DetailedOrder() { Id = 2, OrderId = 1, ProductId = 5, Amount = 5, TotalCost = 525, TotalPvp = 682.50M, TotalPvpIva = 825.83M }
                );

            // Entity tables
            // Role
            /*const string ADMIN_ID = "a18be9c0-aa65-4af8-bd17-00bd9344e575";
            const string ROLE_ID = ADMIN_ID;

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = ROLE_ID,
                Name = "admin",
                NormalizedName = "admin"
            });*/
            // Employee
            var hasher = new PasswordHasher<Employee>();
            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                Id = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                UserName = "admin@gmail.com",
                NormalizedUserName = "admin@gmail.com".ToUpper(),
                Email = "admin@gmail.com",
                NormalizedEmail = "admin@gmail.com".ToUpper(),
                EmailConfirmed = true,
                Password = "Admin100#",
                PasswordHash = hasher.HashPassword(null, "Admin100#"),
                SecurityStamp = Guid.NewGuid().ToString(),
                Name = "Juan",
                Surname1 = "García",
                Surname2 = "Pérez",
                Position = "Jefe de ventas",
                Department = "Ventas",
                Rol = "Administrador",
                Salary = 45000.00M
            });
            // User Role Relationship
          /*  modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = ROLE_ID,
                UserId = ADMIN_ID
            });*/
        }
    }
}
