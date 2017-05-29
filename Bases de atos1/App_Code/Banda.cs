using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Banda
/// </summary>
[Serializable]
public class Banda
{
    private string nombre { get; set; }
    private List<string> miembros { get; set; }
    private List<string> cancionesPrincipales { get; set; }
    private string foto { get; set; }


    public Banda()
    {
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }
}