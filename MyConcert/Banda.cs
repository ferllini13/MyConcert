using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyConcert
{
    [Serializable]
    public class Banda
    {
        private string nombre { get; set; }
        private List<string> miembros { get; set; }
        private List<string> cancionesPrincipales { get; set; }
        private string foto { get; set; }
        private int id { get; set; }


        public Banda()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }
        public string Nombre { get { return nombre; } set { nombre = value; } }
        public List<string> Miembros { get { return miembros; } set { miembros = value; } }
        public List<string> CancionesPrincipales { get { return cancionesPrincipales; } set { cancionesPrincipales = value; } }
        public string Foto { get { return foto; } set { foto = value; } }
        public int Id { get { return id; } set { id= value; } }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////7
        // aqui empieza las llamadas a la base de datos
        //////////////////////////////////////////////////////////////////////////////////////////////////777
        /// <summary>
        /// este método es para obtener todas las bandas 
        /// </summary>
        /// <returns> un json con todas las bandas </returns>
        public string ObtenerBandas()
        {
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            string aux = "";
            basededatos.Conexion.Open();
            string consulta = "select * from banda";
            aux = basededatos.ObtenerDatosConsulta(consulta);
            basededatos.Conexion.Close();
            return aux;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////7
        //////////////////////////////////////////////////////////////////////////////////////////////////////////7
        // aqui empieza las llamadas a la base de datos
        //////////////////////////////////////////////////////////////////////////////////////////////////777
        /// <summary>
        /// este método es para obtener todas las bandas 
        /// </summary>
        /// <returns> un json con todas las bandas </returns>
        public string ObtenerGeneros()
        {
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            string aux = "";
            basededatos.Conexion.Open();
            string consulta = "select * from genero";
            aux = basededatos.ObtenerDatosConsulta(consulta);
            basededatos.Conexion.Close();
            return aux;
        }
    }
}