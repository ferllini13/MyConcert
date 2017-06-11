using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyConcert
{
    [Serializable]
    public class Banda
    {
        //{"nombre":"arctic monkys","miembros":["Jason Leitón","Jairo Mendez","Francisco Alvarado","Mauricio Montero"],"cancionesPrincipales":[""]}
        private string nombre { get; set; }
        private List<string> miembros { get; set; }
        private List<string> cancionesPrincipales { get; set; }
        private List<string> preVewCancionesPrincipales { get; set; }
        private string foto { get; set; }
        private int id { get; set; }
        private List<int> generos { set; get; }
        private List<string> albums { set; get; }
        private List<string> fotosAlbuns { set; get; }
        private int cantidadSeguidores { set; get; }
        private int popularidad { set; get; }
        private string paisProcedencia { set; get; }
        public Banda()
        {
            fotosAlbuns = new List<string>();
            preVewCancionesPrincipales = new List<string>();
            albums = new List<string>();
            cancionesPrincipales = new List<string>();
            
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }
        public string Nombre { get { return nombre; } set { nombre = value; } }
        public List<string> Miembros { get { return miembros; } set { miembros = value; } }
        public List<string> CancionesPrincipales { get { return cancionesPrincipales; } set { cancionesPrincipales = value; } }
        public string Foto { get { return foto; } set { foto = value; } }
        public int Id { get { return id; } set { id= value; } }
        public List<int> Generos { set { generos = value; } get { return generos; } }
        public List<string> Albums { set { albums = value; } get { return albums; } }
        public List<string> FotosAlbuns { set { fotosAlbuns = value; } get { return fotosAlbuns; } }
        public int CantidadSeguidores { set { cantidadSeguidores = value; } get { return cantidadSeguidores; } }
        public int Popularidad { set { popularidad=value; } get {return popularidad; } }
        private string PaisProcedencia { set {paisProcedencia=value; }  get {return paisProcedencia; } }
        private List<string> PreVewCancionesPrincipales { get {return preVewCancionesPrincipales; } set {preVewCancionesPrincipales=value; } }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////77
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////777

        public string ObtenerDatosSpotify(string nombreBanda)
        {
            Spotify spotify = new Spotify();
            albums = spotify.ObtenerAlbumSpotify(nombreBanda, 0);
            fotosAlbuns = spotify.ObtenerAlbumSpotify(nombreBanda, 1);
            cancionesPrincipales.Add((String) "do i wanna know");
            cancionesPrincipales.Add((String) "arabella");
            foreach (string i in cancionesPrincipales)
            {
                string aux = spotify.ObtenerIdCanciones(nombreBanda+" "+ i);
                preVewCancionesPrincipales.Add((String) spotify.ObtenerPrevewCanciones(aux));
            }
            try
            {
                popularidad = Convert.ToInt32(spotify.ObtenerPopularidadSeguidores(nombreBanda, 0));
                cantidadSeguidores = Convert.ToInt32(spotify.ObtenerPopularidadSeguidores(nombreBanda, 1));
            }
            catch
            {
                popularidad = 0;
                cantidadSeguidores = 0;
            }
            return "popularidad: " +popularidad.ToString()+" seguidores: "+cantidadSeguidores.ToString() ;
        }



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
        /// <summary>
        /// este método es para obtener una banda 
        /// </summary>
        /// <returns> un json con una banda </returns>
        public string ObtenerUnaBanda()
        {
            string aux = "";
            string nombreStore = "dbo.pr_SelecionarBanda";
            List<string> nombresParametros = new List<string> { "@bandaID" };// parametros
            List<Object> valores = new List<Object> { id };// valores de los parametros 
            List<string> tipo = new List<string> { "int" }; // tipos de los valores
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore, nombresParametros, valores, tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos
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
        //////////////////////////////////////////////////////////////////////////////////////////////////777
        /// <summary>
        /// este método es para obtener los miembros de las bandas
        /// </summary>
        /// <returns> un json con todos los miembros </returns>
        public string ObtenerMiembros()
        {
            string aux = "";
            string nombreStore = "dbo.pr_SelecionarArtistaBanda";
            List<string> nombresParametros = new List<string> { "@bandaID" };// parametros
            List<Object> valores = new List<Object> { id };// valores de los parametros 
            List<string> tipo = new List<string> { "int" }; // tipos de los valores
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore, nombresParametros, valores, tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos
            return aux;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////777
        /// <summary>
        /// este método es para obtener los 
        /// </summary>
        /// <returns> un json con todos los miembros </returns>
        public string ObtenerCanciones()
        {
            string aux = "";
            string nombreStore = "dbo.pr_SelecionarCancionBanda";
            List<string> nombresParametros = new List<string> { "@bandaID" };// parametros
            List<Object> valores = new List<Object> { id };// valores de los parametros 
            List<string> tipo = new List<string> { "int" }; // tipos de los valores
            FachadaBaseDatos basededatos = new FachadaBaseDatos();
            basededatos.Conexion.Open(); //abre la conexión a la base de datos
            aux = basededatos.EstablecerStoreProcedure(nombreStore, nombresParametros, valores, tipo);
            basededatos.Conexion.Close(); // cierra la conexion con la ase de datos
            return aux;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////777
        /// <summary>
        /// este método es para obtener los comentarios 
        /// </summary>
        /// <returns> un json con todos los comentarios </returns>
        public string ObtenerComentarios()
        {
            string aux = "";
            string nombreStore = "dbo.pr_SelecionarComentarioBanda";
            List<string> nombresParametros = new List<string> { "@bandaID" };// parametros
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