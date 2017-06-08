using Microsoft;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using TweetSharp;
namespace MyConcert
{
    /// <summary>
    /// Esta es la clase responsable de crear una fachada, la cual tiene como función comunicar y a la misma vez aislar 
    /// la capa de servicio con la de presentación.
    /// </summary>
    [WebService(Namespace = "http://MyConcert")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
     [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Hola(string frase) // este método hace la prueba de serializar el json
        {
            return "2324"; 
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////7




        /// <summary>
        /// Este método es para publicar algun contenido en twitter
        /// </summary>
        /// <param name="frase"> La frase indica el texto que se quiere publicar en twitter</param>
        /// <returns></returns>

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Publicar(string frase) // este método hace la prueba de serializar el json
        {
            ConectionTwitter twiteo = new ConectionTwitter(); // crea el objeto para publicar el texto

            return twiteo.EnviarTwit(frase); // manda el mensaje que se quiere publicar 
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [WebMethod]
        public string VerificarLogeo(string frase) // este método hace la prueba de serializar el json
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            UsuarioFanatico usuario = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UsuarioFanatico>(frase);

            return usuario.VerificarLogeo();
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
        /// <summary>
        /// Este metodo consiste consiste en devolver todas las bandas del catálogo
        /// </summary>
        /// <returns> retorna todas las bandas en json</returns>
        [WebMethod]
        public string ObtenerTodasBandas() // este método hace la prueba de serializar el json
        {
            Banda banda = new Banda();// crea el objeto de crear banda
            return banda.ObtenerBandas(); // obtiene las bandas
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
        /// <summary>
        /// este método es para obtener todos los datos de un usuario
        /// </summary>
        /// <param name="frase"> recibe el id del usuario</param>
        /// <returns></returns>
        [WebMethod]
        public string ObtenerFanatico(string frase) // este método hace la prueba de serializar el json
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            UsuarioFanatico usuario = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UsuarioFanatico>(frase);
            return usuario.ObtenerDatosFanatico(); // obtiene las bandas
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// este método es para obtener todos los datos de un usuario
        /// </summary>
        /// <param name="frase"> recibe el id del usuario</param>
        /// <returns></returns>
        [WebMethod]
        public string ObtenerPromocion(string frase) // este método hace la prueba de serializar el json
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            UsuarioPromocion usuario = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UsuarioPromocion>(frase);
            return usuario.ObtenerDatosPromocion(); // obtiene las bandas
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// este método es para crear un fanatico
        /// </summary>
        /// <param name="frase"> json con la informacion del usuario </param>
        /// <returns> estado de como  sucedió el comando</returns>
        [WebMethod]
        public string CrearFanatico(string frase) // este método hace la prueba de serializar el json
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            UsuarioFanatico usuario = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UsuarioFanatico>(frase);
            return usuario.IntroducirFanatico(); // obtiene las bandas
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="frase"></param>
        /// <returns></returns>
        [WebMethod]
        public string InsertarGeneros(string frase) // este método hace la prueba de serializar el json
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            UsuarioFanatico usuario = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UsuarioFanatico>(frase);
            return usuario.InsertarGeneros(); // obtiene las bandas
        }
        /// <summary>
        /// este metodo es para obtener todos los generos 
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public string ObtenerGeneros() // este método hace la prueba de serializar el json
        {
            Banda banda = new Banda();
            return banda.ObtenerGeneros(); // obtiene las bandas
        }
    }
}
