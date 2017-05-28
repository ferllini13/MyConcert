using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TweetSharp;
/// <summary>
/// Summary Esta clase es para realizar la conexion con Twitter y publicar 
/// el texto deseado ya sea para cancelar festival, crear festival y añadir banda
/// </summary>
/// 
/// 
/////////////////////////////////////////////////////////////////////////////
// Instituto Tecnológico de Costa Rica
// Proyecto: Myconcert
// Descripción: Clase para conectar con twiter
// Generado por ITCR Gen v1.0.0.0
// Fecha: sábado, 20 de Mayo de 2017, 5:57:00 p.m.
////////////////////////////////////////////////////////////////////////////  
public class ConectionTwitter
{
    /// <summary>
    /// Summary todas estan variables son generadas por la página, con la cual se registró
    /// se establecen de una vez porque nunca van a cambiar a menos de se vuelva a registrar 
    /// </summary>
    private static string costumerKey;
    private static string costumerSecret;
    private static string tokenAccess;
    private static string tokenSecret;
    private TwitterService service ;
    private string resultado;
    public ConectionTwitter()
    {
        costumerKey = "gvqQMKAfEa1VB2v7LXXPNhXtm";
        costumerSecret = "LE5ItGPo8oD9QAwEUmBQl0N0MKQ8qruPDxw9q9RQjVpcskksya";
        tokenAccess = "860906161805172736-xGwH5F8aMKdnOytjGR8OQ2Oex2CTnFz";
        tokenSecret = "SUkUHu05B0VSqR80tastMm3h5YKIch6aFITUE4VaBWOQ6";
        service = new TwitterService(costumerKey, costumerSecret, tokenAccess, tokenSecret);
    }
    /// <summary>
    /// este metodo es el que se encarga de postear los mensajes desados
    /// </summary>
    /// <param name="menssage"> se refiere al mensaje que se desea postear en twitter</param>
    /// <returns></returns>
    public string EnviarTwit(String menssage) // recibe lo que se desea twittear 
    {
        // la siguiente linea crea un objeto instalado desde nuget 
        service.SendTweet(new SendTweetOptions { Status = menssage }, (tweet, response) =>
        {
            if (response.StatusCode == System.Net.HttpStatusCode.OK) // si la respuesta está bien prosiga
            {
                resultado = "se realizó la publicación";
            }
            else// si no, mande una señal de que no se pudo publicar el mensaje
            {
                resultado = "404 fallo en la conexión con twitter";
            }
        });
        return resultado;
    }
}