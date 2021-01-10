using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiBibliotecaWeb.Models
{
    public class Libro
    {
        [Key]
        public int id { get; set; }
        
        public string nombre { get; set; }
        
        public int anio { get; set; }
        
        public string autor { get; set; }
    }
}
