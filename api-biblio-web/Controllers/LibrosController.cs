using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using ApiBibliotecaWeb.Contexts;
using ApiBibliotecaWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiBibliotecaWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibrosController : ControllerBase
    {
        private readonly AppDbContext context;
        public LibrosController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<LibrosController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Libro.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<LibrosController>/5
        [HttpGet("{id}", Name = "GetLibro")]
        public ActionResult Get(int id)
        {
            try
            {
                var libro = context.Libro.FirstOrDefault(l => l.id == id);

                return Ok(libro);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<LibrosController>
        [HttpPost]
        public ActionResult Post([FromBody]Libro libro)
        {
            try
            {
                context.Libro.Add(libro);
                context.SaveChanges();

                return CreatedAtRoute("GetLibro", new { id = libro.id }, libro);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<LibrosController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Libro libro)
        {
            try
            {
                if (libro.id == id)
                {
                    context.Entry(libro).State = EntityState.Modified;
                    context.SaveChanges();

                    return CreatedAtRoute("GetLibro", new { id = libro.id }, libro);
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<LibrosController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var libro = context.Libro.FirstOrDefault(l => l.id == id);
                if (libro != null)
                {
                    context.Libro.Remove(libro);
                    context.SaveChanges();

                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
