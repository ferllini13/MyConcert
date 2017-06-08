using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace MyConcert
{
    public class FachadaBaseDatos
    {
        protected SqlConnection conexion { get; set; }
        protected DataTable tabla { get; set; }
        protected SqlCommand comando;

        // constructor 
        public FachadaBaseDatos()
        {
            this.conexion = new SqlConnection("Server=myconcertserver.database.windows.net;Database=myConcertDB;Uid=jmm26;Pwd=Sofaraway26;");
            this.tabla =new DataTable("Tabla de retorno");// estructura que almacenará los datos 
        }
        public SqlConnection Conexion
        {
            get { return conexion; }
            set { conexion = value; }
        }
        public DataTable Tabla
        {
            get { return tabla; }
            set { tabla = value;}
        }
        public SqlCommand Comando
        {
            get { return comando; }
            set { comando = value; }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public string ObtenerDatosConsulta (string consulta)
        {
            try
            {
                comando = new SqlCommand(consulta, conexion); // crea la consulta
                tabla.Load(comando.ExecuteReader()); // ejecuta el strore procedure
            }
            catch
            {

            }
                return ConvertDataTableTojSonString(tabla); // retorna los datos en json
           
        }



        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// este método es para establecer el nombre del store procedure que está en la base de datos
        /// </summary>
        /// <param name="nombre"> recibe el nombre del store procedure que está en la base de datos</param>
        public string EstablecerStoreProcedure(string nombre,List<string> nombresParametros,List<Object> valores,List<string> tipo)
        {
            comando = new SqlCommand(nombre, conexion);// establece el nommbre del store procedure
            comando.CommandType = System.Data.CommandType.StoredProcedure;// elige el tiipo de consulta
            string aux = "";
            string nombreaux = "";
            for (int i = 0; i < valores.Count; i++) // recorre las listas
            {
                aux = tipo.ElementAt(i);
                nombreaux = nombresParametros.ElementAt(i);
                if (aux == "int")
                {
                    comando.Parameters.AddWithValue(nombreaux, SqlDbType.Int).Value = valores.ElementAt(i); 
                }
                else if (aux == "string")
                {
                    comando.Parameters.AddWithValue(nombreaux, SqlDbType.Char).Value = valores.ElementAt(i);
                }
                else if (aux == "bit")
                {
                    comando.Parameters.AddWithValue(nombreaux, SqlDbType.Bit).Value = valores.ElementAt(i);
                }
                else if (aux == "tablaInt")
                { 
                    //comando.Parameters.AddWithValue(nombreaux, SqlDbType.Structured).Value = CreateDataTable(a);                   
                    var pList = new SqlParameter(nombreaux, SqlDbType.Structured);
                    pList.TypeName = "dbo.intList";
                    pList.Value = valores.ElementAt(i);
                    comando.Parameters.Add(pList);
                }
                else if (aux == "tablaString")
                {
                    var pList = new SqlParameter(nombreaux, SqlDbType.Structured);
                    pList.TypeName = "dbo.stringList";
                    pList.Value = valores.ElementAt(i);
                    comando.Parameters.Add(pList);
                }
            }
            tabla.Load(comando.ExecuteReader()); // ejecuta el strore procedure
            
            return ConvertDataTableTojSonString(tabla); // retorna los datos en json
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
        /// <summary>
        /// este método es para crear una tabla apartir de una lista y enviarla 
        /// </summary>
        /// <param name="lista"> la lista con los valores deseados</param>
        ///  <param name="tipo"> 0 si es un int</param>
        /// <returns></returns>
        public DataTable CreateDataTable(List<int> lista)
        {
            DataTable table = new DataTable();
            
                table.Columns.Add("item", typeof(int));
                foreach (int id in lista)
                {
                    table.Rows.Add(id);
                }
            

            return table;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
        /// <summary>
        /// este método es para crear una tabla apartir de una lista y enviarla 
        /// </summary>
        /// <param name="lista"> la lista con los valores deseados</param>
        ///  <param name="tipo"> 0 si es un int</param>
        /// <returns></returns>
        public DataTable CreateDataTableString(List<string> lista)
        {
            DataTable table = new DataTable();
                table.Columns.Add("item", typeof(string));
                foreach (string id in lista)
                {
                    table.Rows.Add(id);
                }
            

            return table;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////777

        /// <summary>
        /// este método consiste en convertir todos los datos de la base de datos a  json 
        /// </summary>
        /// <param name="dataTable"></param>
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
    
}