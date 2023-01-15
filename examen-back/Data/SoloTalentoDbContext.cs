using examen_back.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace examen_back.Data;

public class SoloTalentoDbContext : DbContext
{
    public SoloTalentoDbContext(DbContextOptions<SoloTalentoDbContext> options) : base(options)
    {

    }

    public virtual DbSet<Articulos> Articulos { get; set; }
    public virtual DbSet<Clientes> Clientes { get; set; }
    public virtual DbSet<Tiendas> Tiendas { get; set; }
    public virtual DbSet<ClientesArticulos> ClientesArticulos { get; set; }
    public virtual DbSet<ArticulosTiendas> ArticulosTiendas { get; set; }
}