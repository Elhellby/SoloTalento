using examen_back.Data;
using examen_back.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace examen_back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TiendasController : ControllerBase
{
    private readonly ILogger<TiendasController> _logger;
    private readonly SoloTalentoDbContext _context;

    public TiendasController(ILogger<TiendasController> logger, SoloTalentoDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tiendas>>> Get()
    {
        return await _context.Tiendas.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tiendas>> Get(int id)
    {
        var tienda = await _context.Tiendas.FindAsync(id);
        if (tienda == null)
            return NotFound();
        else
            return tienda;
    }

    [HttpPost]
    public async Task<ActionResult> Post(Tiendas tienda)
    {
        _context.Tiendas.Add(tienda);
        int save = await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, Tiendas tienda)
    {
        if(id!=tienda.IdTienda)
        return BadRequest();

        _context.Entry(tienda).State=EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var tienda = await _context.Tiendas.FindAsync(id);
        if (tienda == null)
            return NotFound();
        else{
            _context.Tiendas.Remove(tienda);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
