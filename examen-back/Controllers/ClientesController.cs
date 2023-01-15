using examen_back.Data;
using examen_back.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace examen_back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly ILogger<ClientesController> _logger;
    private readonly SoloTalentoDbContext _context;

    public ClientesController(ILogger<ClientesController> logger, SoloTalentoDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Clientes>>> Get()
    {
        return await _context.Clientes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Clientes>> Get(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if (cliente == null)
            return NotFound();
        else
            return cliente;
    }

    [HttpPost]
    public async Task<ActionResult> Post(Clientes cliente)
    {
        _context.Clientes.Add(cliente);
        int save = await _context.SaveChangesAsync();
        
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, Clientes cliente)
    {
        if(id!=cliente.IdCliente)
        return BadRequest();

        _context.Entry(cliente).State=EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if (cliente == null)
            return NotFound();
        else{
            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
