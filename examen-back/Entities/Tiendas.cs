using System;
using System.ComponentModel.DataAnnotations;

namespace examen_back.Entities;

public class Tiendas
{
    [Key]
    public int IdTienda { get; set; }
    public string? Sucursal { get; set; }
    public string? Direccion { get; set; }
}
