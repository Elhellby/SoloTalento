using examen_back.Data;
using examen_back.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace examen_back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticulosController : ControllerBase
{
    private readonly ILogger<ArticulosController> _logger;
    private readonly SoloTalentoDbContext _context;

    public ArticulosController(ILogger<ArticulosController> logger, SoloTalentoDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Articulos>>> Get()
    {
        return await _context.Articulos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Articulos>> Get(int id)
    {
        var articulo = await _context.Articulos.FindAsync(id);
        if (articulo == null)
            return NotFound();
        else
            return articulo;
    }

    [HttpPost]
    public async Task<ActionResult> Post(Articulos articulos)
    {
        _context.Articulos.Add(articulos);
        int save = await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, Articulos articulos)
    {
        if(id!=articulos.IdArticulo)
        return BadRequest();

        _context.Entry(articulos).State=EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var articulo = await _context.Articulos.FindAsync(id);
        if (articulo == null)
            return NotFound();
        else{
            _context.Articulos.Remove(articulo);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
