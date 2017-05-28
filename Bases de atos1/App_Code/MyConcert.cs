using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Runtime.Serialization.Json;
using System.IO;
using TweetSharp;   // esta librería es para conectar con twitter
using System.Timers;

/// <summary>
/// Summary esta clase es la que se encarga de tener los métodos de web service
/// </summary>
[WebService(Namespace = "http://MyConcert")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class MyConcert : System.Web.Services.WebService
{

    public MyConcert()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    /////////////////////////////////////////////////////////////////////////////////////
    /// <summary>
    /// este método es para que la web lo llame cuando se necesita publicar en twitter
    /// </summary>
    /// <param name="frase">recibe los que se quiere publicar</param>
    /// <returns></returns>
    [WebMethod]
    public string Publicar(string frase) // este método hace la prueba de serializar el json
    {
        ConectionTwitter twiteo = new ConectionTwitter(); // crea el objeto para publicar el texto

        return twiteo.EnviarTwit(frase); // manda el mensaje que se quiere publicar 
    }
    /// <summary>
    
    /// </summary>
    /// <param name="frase"></param>
    /// <returns></returns>
    [WebMethod]
    [ScriptMethod (ResponseFormat =ResponseFormat.Json)] // es parara que responda en formato json
    public string  Parsear(string frase) // este método hace la prueba de serializar el json
    {
        //
        JavaScriptSerializer ser = new JavaScriptSerializer();
        UsuarioFanatico objeto = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UsuarioFanatico>(frase);
        return objeto.Generos[0];

        
        
        //UsuarioFanatico usuario = new UsuarioFanatico();
        //return new JavaScriptSerializer().Serialize(usuario);
    }

    /// <summary>
    /// este método es para pasar los resultados de las tablas a un json para despues mandarlos 
    /// como respuestas hacia la web
    /// </summary>
    /// <param name="dataTable"> es la tabla que retorna la base de datos</param>
    /// <returns></returns>
    public String ConvertDataTableTojSonString(DataTable dataTable) // este método es quien realiza la conversion a json 
    {
        JavaScriptSerializer serializer = new JavaScriptSerializer();// crea el objeto para serializar

        List<Dictionary<String, Object>> tableRows = new List<Dictionary<String, Object>>();

        Dictionary<String, Object> row;

        foreach (DataRow dr in dataTable.Rows) // para cada linea osea cada fila en la tabla
        {
            row = new Dictionary<String, Object>();//cree un diccionario para cada fila 
            foreach (DataColumn col in dataTable.Columns)// para cada columna en la tabla 
            {
                row.Add(col.ColumnName, dr[col]);// agrgue al diccionario el valor de cada columna 
            }
            tableRows.Add(row); // agregue la fila correspondiente
        }
         return serializer.Serialize(tableRows);// hace la conversión
    }
}

// clase que va a corresponder a fanático
[Serializable]
public class UserFanatico
{
    private string nombre { get; set; }
    private string apellido { get; set; }
    private string username { get; set; }


    public UserFanatico(string nombre, string apellido,string username)
    {
        this.apellido = apellido;
        this.nombre = nombre;
        this.username = username;
    }
    public string  Nombre
    {
        get { return nombre; }
        set { nombre = value; }
    }
    public string Apellido
    {
        get { return apellido; }
        set { apellido = value; }
    }
    public string Username
    {
        get { return username; }
        set { username = value; }
    }
}



