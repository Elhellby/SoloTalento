using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace examen_back.Entities;

[Keyless]
public class ClientesArticulos
{
    [Display(Name = "Clientes")]
    public virtual int IdCliente { get; set; }
    [ForeignKey("IdCliente")]
    public required virtual Clientes Clientes { get; set; }

    [Display(Name = "Articulos")]
    public int IdArticulo { get; set; }
    [ForeignKey("IdArticulo")]
    public required Articulos Articulos { get; set; }

    public DateTime Fecha { get; set; }
}
