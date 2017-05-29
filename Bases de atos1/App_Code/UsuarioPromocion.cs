using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// esta es la clase que va a modelar el usuario de promoción es la que va a contener las validaciones 
/// que se necesitan para los datos de este tipo de usuario
/// </summary>
[Serializable]
public class UsuarioPromocion
{

    
    // estos son los datos que un usuario de promoción puede tener
    private string nombre { get; set; }
    private string apellido { get; set; }
    private string email { get; set; }
    private string identificador { get; set; }
    private string fechaInscripcion { get; set; }
    private string password { get; set; }
    private string username { get; set; }
    public UsuarioPromocion()
    {
        //
        // en el constructor no va nada porque la asignación es serializable
        //
    }
    public string Nombre {
        get { return nombre; } set {nombre=value; } }
    public string Apellido { get {return apellido; } set {apellido=value; } }
    public string Email { get {return email; } set {email=value; } }
    public string Identificador { get {return identificador; } set {identificador=value; } }
    public string FechaInscripcion { get {return fechaInscripcion; } set {fechaInscripcion=value; } }
    public string Password { get { return password; } set {password=value; } }
    public string Username { get {return username; } set {username=value; } }
}