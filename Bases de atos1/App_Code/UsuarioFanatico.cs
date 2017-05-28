using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// esta clase es la que va a modelar el usario de fanático así como las funcionalidades que debe 
/// cumplir este tipo de usuario, las validaciones de los datos serán implementadas en esta clase
/// </summary>
[Serializable]
public class UsuarioFanatico
{
    // estos son todos datos que se pueden obtener de los fanáticos
    //{"nombre":"jason","apellido":"leiton","pais":"CR","ubicacion":"Cartago","universidad":"TEC","email":"ljjaso@","telefono":71000041,"foto":"estagurda","fechaInscripcion":"2/3/3","password":"leitocito","generos":["salsa","merengue"],"descripcion":"soy estudiante","fechaNacimiento":"3/7/7","userName":"jajoji"}

    private string nombre { get; set; }
    private string apellido { get; set; }
    private string pais { get; set; }
    private string ubicacion { get; set; }
    private string universidad { get; set; }
    private string email { get; set; }
    private string telefono { get; set; }
    private string foto { get; set; }
    private string fechaInscripcion { get; set; }
    private string password { get; set; }
    private List<string> generos { get; set; }
    private string descripcion { get; set; }
    private string fechaNacimiento { get; set; }
    private string userName { get; set; }


    public UsuarioFanatico() // este es el constructor 
    {
        this.generos = new List<string>();
    }
    // estos son los get y set de cada atributo
    public string Nombre
    {
        get { return nombre; }
        set { nombre = value;}
    }
    public string Apellido
    {
        get { return apellido; }
        set { apellido = value; }
    }
    public string Pais
    {
        get { return pais; }
        set { pais = value; }
    }
    public string Ubicacion
    {
        get { return ubicacion; }
        set { ubicacion = value; }
    }
    public string Universidad
    {
        get { return universidad; }
        set { universidad = value; }
    }
    public string Email
    {
        get { return email; }
        set { email = value; }
    }
    public string Telefono
    {
        get { return telefono; }
        set { telefono = value; }
    }
    public string Foto
    {
        get { return foto; }
        set { foto = value; }
    }
    public string FechaInscripcion
    {
        get { return fechaInscripcion; }
        set { fechaInscripcion = value; }
    }
    public string Password
    {
        get { return password; }
        set { password = value; }
    }
    public List <string> Generos
    {
        get { return generos; }
        set { generos = value; }
    }
    public string Descripcion
    {
        get { return descripcion; }
        set { descripcion = value; }
    }
    public string FechaNacimiento
    {
        get { return fechaNacimiento; }
        set { fechaNacimiento = value; }
    }
    public string UserName
    {
        get { return userName; }
        set { userName = value; }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /// aqui termina los set y los get 
    
}