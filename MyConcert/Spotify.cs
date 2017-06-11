using Hammock.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpotifyAPI.Web; //Base Namespace
using SpotifyAPI.Web.Auth; //All Authentication-related classes
using SpotifyAPI.Web.Enums; //Enums
using SpotifyAPI.Web.Models; //Models for the JSON-responses
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MyConcert
{
    public class Spotify
    {
        private static ClientCredentialsAuth auth;
        private string cliente= "9af999afea98428094bdb447ef80c666";
        private string error;
        private Token token;
        public Spotify () {
            auth = new ClientCredentialsAuth()
            {
                //Your client Id
                ClientId = "4ea812437f8242599ceefeddacb80df0",
                //Your client secret UNSECURE!!
                ClientSecret = "13c8e7890bc34b34b1bfd3784e5de0fd",
                //How many permissions we need?
                Scope = Scope.UserReadPrivate | Scope.UserReadEmail | Scope.PlaylistReadPrivate | Scope.UserLibraryRead |
                Scope.UserReadPrivate | Scope.UserFollowRead | Scope.UserReadBirthdate | Scope.UserTopRead | Scope.PlaylistReadCollaborative |
                Scope.UserReadRecentlyPlayed | Scope.UserReadPlaybackState | Scope.UserModifyPlaybackState,
            };
            //With this token object, we now can make calls
             token = auth.DoAuth();


        }
        public string  Autenticar(string nombre)
        {
            return ObtenerId(nombre);
        }
        /// <summary>
        /// este métedo es para obtener el id de los artistas, con el fin de de obtner todos los demás datos
        /// </summary>
        /// <param name="nombre"> recibe el nombre del artista</param>
        /// <returns></returns>
        public  string  ObtenerId(string nombre)
        {
            // ejemplo de request para obtner el id del artista, con el fin de sacar los demás datos
            //https://api.spotify.com/v1/search?q=mana&type=artist&limit=1&offset=0
            var a="";
            string valor ="";
            string id="";
            string aux = token.AccessToken.ToString(); 
            string WEBSERVICE_URL = "https://api.spotify.com/v1/search?q="+nombre+"&type=artist&limit=1&offset=0";
            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                if (webRequest != null)
                {
                    webRequest.Method = "GET"; // tipo de request 
                    webRequest.Timeout = 20000; // tiempo de espera 
                    webRequest.ContentType = "application/json"; // tipo 
                    webRequest.Headers.Add("Authorization", "Bearer "+aux); // se introduce el token generado por token
                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            valor = jsonResponse;
                            dynamic stuff = JsonConvert.DeserializeObject(valor); // lo convierte a objeto a json
                            valor = stuff.artists.items[0].id; // obtiene solo el id de todos los datos
                            
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return valor;  
        }
        /// <summary>
        /// este métedo es para obtener el id de los artistas, con el fin de de obtner todos los demás datos
        /// </summary>
        /// <param name="nombre"> recibe el nombre del artista</param>
        /// <returns></returns>
        public List<string> ObtenerAlbumSpotify(string nombre, int tipo)
        {
            // ejemplo de request para obtner el id del artista, con el fin de sacar los demás datos
            //
            var a = "";
            List<string> albunes = new List<string> ();
            string valor = "";
            string id = "";
            string aux = token.AccessToken.ToString();
            string WEBSERVICE_URL = "https://api.spotify.com/v1/search?q=" + nombre + "&type=album&limit=5&offset=0";

            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                if (webRequest != null)
                {
                    webRequest.Method = "GET"; // tipo de request 
                    webRequest.Timeout = 20000; // tiempo de espera 
                    webRequest.ContentType = "application/json"; // tipo 
                    webRequest.Headers.Add("Authorization", "Bearer " + aux); // se introduce el token generado por token
                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            valor = jsonResponse;
                            dynamic stuff = JsonConvert.DeserializeObject(valor); // lo convierte a objeto a json
                            valor = stuff.albums.items[2].images[0].url;
                            
                           try
                            {
                                if (tipo == 0)// albunes
                                {
                                    albunes.Add((String) stuff.albums.items[0].name);
                                    albunes.Add((String) stuff.albums.items[1].name);
                                    albunes.Add((String) stuff.albums.items[2].name);
                                }
                                else // fotos de las albunes
                                {
                                    albunes.Add((String) stuff.albums.items[0].images[0].url);
                                    albunes.Add((String) stuff.albums.items[1].images[0].url);
                                    albunes.Add((String) stuff.albums.items[2].images[0].url);
                                }
                                }
                            catch
                                {
                                albunes = null;
                            }

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return albunes;
        }
        public string ObtenerIdCanciones(string nombre)
        {
            // ejemplo de request para obtner el id del artista, con el fin de sacar los demás datos
            //https://api.spotify.com/v1/search?q=mana&type=artist&limit=1&offset=0
            var a = "";
            string valor = "";
            string id = "";
            string aux = token.AccessToken.ToString();
            string WEBSERVICE_URL = "https://api.spotify.com/v1/search?q=" + nombre + "&type=track&limit=1&offset=0";
            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                if (webRequest != null)
                {
                    webRequest.Method = "GET"; // tipo de request 
                    webRequest.Timeout = 20000; // tiempo de espera 
                    webRequest.ContentType = "application/json"; // tipo 
                    webRequest.Headers.Add("Authorization", "Bearer " + aux); // se introduce el token generado por token
                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            valor = jsonResponse;
                            dynamic stuff = JsonConvert.DeserializeObject(valor); // lo convierte a objeto a json
                            valor = stuff.tracks.items[0].id; // obtiene solo el id de todos los datos

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return valor;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
        public string ObtenerPrevewCanciones(string nombre)
        {
            // ejemplo de request para obtner el id del artista, con el fin de sacar los demás datos
            //https://api.spotify.com/v1/tracks?ids=3Au6174rC3JSzZN5BhCl3D&market=ES
            var a = "";
            string valor = "";
            string id = "";
            string aux = token.AccessToken.ToString();
            string WEBSERVICE_URL = " https://api.spotify.com/v1/tracks/"+nombre+"?market=SE"; // "https://api.spotify.com/v1/tracks/"+nombre+ "?market=SE";//"https://api.spotify.com/v1/tracks/{" + nombre+"}" ;
            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                if (webRequest != null)
                {
                    webRequest.Method = "GET"; // tipo de request 
                    webRequest.Timeout = 20000; // tiempo de espera 
                    webRequest.ContentType = "application/json"; // tipo 
                    webRequest.Headers.Add("Authorization", "Bearer " + aux); // se introduce el token generado por token
                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            valor = jsonResponse;
                            dynamic stuff = JsonConvert.DeserializeObject(valor); // lo convierte a objeto a json
                            valor = stuff.preview_url; // obtiene solo el id de todos los datos
                            if ((valor==null))
                            {
                                valor ="";
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return valor;
        }
        public string ObtenerPopularidadSeguidores(string nombre,int tipo)
        {
            // ejemplo de request para obtner el id del artista, con el fin de sacar los demás datos
            //https://api.spotify.com/v1/search?q=mana&type=artist&limit=1&offset=0
            var a = "";
            int b =0;
            string valor = "";
            string id = "";
            string aux = token.AccessToken.ToString();
            string WEBSERVICE_URL = "https://api.spotify.com/v1/search?q=" + nombre + "&type=artist&limit=1&offset=0";
            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                if (webRequest != null)
                {
                    webRequest.Method = "GET"; // tipo de request 
                    webRequest.Timeout = 20000; // tiempo de espera 
                    webRequest.ContentType = "application/json"; // tipo 
                    webRequest.Headers.Add("Authorization", "Bearer " + aux); // se introduce el token generado por token
                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            valor = jsonResponse;
                            dynamic stuff = JsonConvert.DeserializeObject(valor); // lo convierte a objeto a json
                            if (tipo == 0) // popularidad
                                valor = (String) stuff.artists.items[0].popularity; // obtiene solo el id de todos los datos
                            else
                                valor = (String)(stuff.artists.items[0].followers.total);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return valor;
        }
    }
}