using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace examen_back.Entities;

[Keyless]
public class ArticulosTiendas
{
    [Display(Name = "Articulos")]
    public virtual int IdArticulo { get; set; }
    [ForeignKey("IdArticulo")]
    public required virtual Articulos Articulos { get; set; }

    [Display(Name = "Tiendas")]
    public virtual int IdTienda { get; set; }
    [ForeignKey("IdTienda")]
    public required virtual Tiendas Tiendas { get; set; }


    public DateTime Fecha { get; set; }
}
