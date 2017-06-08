using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyConcert
{
    /// <summary>
    /// esta es la clase que va a modelar el usuario de promoción es la que va a contener las validaciones 
    /// que se necesitan para los datos de este tipo de usuario
    /// </summary>
    [Serializable]
    public class UsuarioPromocion
    {
        //{"nombre":"fran", "apellido":"ferllini","email":"ferllini13","identificador":"2323","fechaInscripcion": "1/2/2", "password": "hola", "username": "chico"}

        // estos son los datos que un usuario de promoción puede tener
        private string nombre { get; set; }
        private string apellido { get; set; }
        private string email { get; set; }
        private string identificador { get; set; }
        private string fechaInscripcion { get; set; }
        private string password { get; set; }
        private string username { get; set; }
        private int rol;
        private int id;
        public UsuarioPromocion()
        {
            //
            // en el constructor no va nada porque la asignación es serializable
            //
        }
        public string Nombre
        {
            get { return nombre; }
            set { nombre = value; }
        }
        public string Apellido { get { return apellido; } set { apellido = value; } }
        public string Email { get { return email; } set { email = value; } }
        public string Identificador { get { return identificador; } set { identificador = value; } }
        public string FechaInscripcion { get { return fechaInscripcion; } set { fechaInscripcion = value; } }
        public string Password { get { return password; } set { password = value; } }
        public string Username { get { return username; } set { username = value; } }
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
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // aqui empieza el código de acceso a la base de datos
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        public string ObtenerDatosPromocion()
        {
            string aux = "";
            string nombreStore = "dbo.pr_ObtenerPromotor";
            List<string> nombresParametros = new List<string> { "@id" };// parametros
            List<Object> valores = new List<Object> { id };// valores de los parametros 
            List<string> tipo = new List<string> { "int" }; // tipos de los valores
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore, nombresParametros, valores, tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos
            return aux;
        }
    }
}