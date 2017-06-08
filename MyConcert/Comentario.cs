using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyConcert
{
    /// <summary>
    /// Descripción breve de Comentario
    /// </summary>
    [Serializable]
    public class Comentario
    {
        // estos son los datos relevantes que deben de modelarse en el comentario
        private string id { get; set; }
        private string mensaje { get; set; }
        private string comentadorId { get; set; } // quien está haciendo el comentario
        private string bandaId { get; set; } // a quien va dirigido el comentario
        private int calificacion { get; set; }// la cantidad de estrellas del comentario
        public Comentario()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }
        // el suguiente código es para los set y get de los atributos
        public string Id { get { return id; } set { id = value; } }
        public string Mensaje { get { return mensaje; } set { mensaje = value; } }
        public string ComentadorId { get { return comentadorId; } set { comentadorId = value; } } // quien está haciendo el comentario
        public string BandaId { get { return bandaId; } set { bandaId = value; } } // a quien va dirigido el comentario
        public int Calificacion { get { return calificacion; } set { calificacion = value; } }

    }
}