using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MyConcert
{
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
        private int pais { get; set; }
        private string ubicacion { get; set; }
        private string universidad { get; set; }
        private string email { get; set; }
        private string telefono { get; set; }
        private string foto { get; set; }
        private string fechaInscripcion { get; set; }
        private string password { get; set; }
        private List<int> generos { get; set; }
        private string descripcion { get; set; }
        private string fechaNacimiento { get; set; }
        private string userName { get; set; }
        private int rol { get; set; }
        private int id { get; set; }


        public UsuarioFanatico() // este es el constructor 
        {
            this.generos = new List<int>();
        }
        // estos son los get y set de cada atributo
        public string Nombre
        {
            get { return nombre; }
            set { nombre = value; }
        }
        public string Apellido
        {
            get { return apellido; }
            set { apellido = value; }
        }
        public int Pais
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
        public List<int> Generos
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
        public int Rol
        {
            get { return rol; }
            set { rol = value; }
        }
        public int Id
        {
            get { return id; }
            set { id = value; }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        /// aqui termina los set y los get 

        /// este método se encarga de validar las contraseñas

        ///<summary>
        ///este código  se encarga de verificar si las contraseñas cumplen con los requisitos.
        ///</summary>
        public Boolean VerificarConstraseña()
        {
            int cantidadNumeros = 0;
            int cantidadLetras = 0;
            int tamaño = password.Length;
            string numeros = "1234567890";
            string signos = "/()=?¡!#&¿";
            bool resultado = true;
            for (int i = 0; i < tamaño; i++)
            {
                if (numeros.Contains((password.Substring(i, 1))))
                {
                    cantidadNumeros++;
                }
                else if (signos.Contains((password.Substring(i, 1))))
                {
                    resultado = false;
                }
                else
                    cantidadLetras++;
            }

            return cantidadLetras > 0 && cantidadNumeros > 0 && resultado && tamaño >= 4 && tamaño <= 8;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // aquí  empieza las llamadas a la base de datos

        public string VerificarLogeo() // este método hace la prueba de serializar el json
        {
            string aux = "";
            string nombreStore = "dbo.pr_ObtenerUsuario";
            List<string> nombresParametros =new List<string> { "@nombreUsuario", "@contraseña" };// parametros
            List<Object> valores = new List<Object> { userName, password };// valores de los parametros 
            List<string> tipo = new List<string> { "string", "string" }; // tipos de los valores
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore,nombresParametros,valores,tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos

            return aux;
        }

        public string ObtenerDatosFanatico()
        {
            string aux = "";
            string nombreStore = "dbo.pr_ObtenerFanatico";
            List<string> nombresParametros = new List<string> { "@id" };// parametros
            List<Object> valores = new List<Object> {id};// valores de los parametros 
            List<string> tipo = new List<string> {"int"}; // tipos de los valores
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore, nombresParametros, valores, tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos
            return aux;
        }
        public string IntroducirFanatico()
        {
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            string aux = "";
            string nombreStore = "dbo.pr_InsertarUsuarioFanatico2";
            List<string> nombresParametros = new List<string> { "@nombre", "@apellido", "@contraseña", "@nombreUsuario",
            "@diaInscripcion","@pais","@ubicacion","@universidad","@celular","@fechaNacimiento","@descripcion","@foto","@email",
            "@rolID","@generoID"};// parametros
            List<Object> valores = new List<Object> {nombre,apellido,password,userName,fechaInscripcion,pais,ubicacion,universidad,
            telefono,fechaNacimiento,descripcion,foto,email,rol,basededatos.CreateDataTable(generos)};// valores de los parametros 
            List<string> tipo = new List<string> { "string", "string", "string", "string", "string","int", "string",
            "string","string","string","string","string","string","int","tablaInt"}; // tipos de los valores

            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore, nombresParametros, valores, tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos
            return aux;
        }
        public string InsertarGeneros()
        {
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            string aux = "";
            string nombreStore = "dbo.pr_FanGenero2";
            List<string> nombresParametros = new List<string> { "@userID","@generoID" };// parametros
            List<Object> valores = new List<Object> { id,basededatos.CreateDataTable(generos) };// valores de los parametros 
            List<string> tipo = new List<string> { "int","tablaInt" }; // tipos de los valores
            
            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore, nombresParametros, valores, tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos
            return aux;
        }
    }
}