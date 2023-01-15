using System;
using System.ComponentModel.DataAnnotations;

namespace examen_back.Entities;

public class Articulos
{
    [Key]
    public int IdArticulo { get; set; } //Clave primaria
    public string? Codigo { get; set; }
    public string? Descripcion { get; set; }
    public float Precio { get; set; }
    public string? Imagen { get; set; }
    public int Stock { get; set; }    
}
