using ApiBibliotecaWeb.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBibliotecaWeb.Contexts
{
    public class AppDbContext :DbContext
    {
        //representacion de la tabla

        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<Libro> Libro { get; set; }
    }
}
