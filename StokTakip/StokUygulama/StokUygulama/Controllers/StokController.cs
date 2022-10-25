using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using StokUygulama.Models;
using System.Data;

namespace StokUygulama.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StokController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public StokController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
            select StokId as ""StokId"",
                   StokName as ""StokName"",
                   StokKategorisi as ""StokKategorisi"",
                   StokAdet as ""StokAdet""
            from Stok
            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon=new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(NpgsqlCommand myCommand=new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();  
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Stok stok)
        {
            string query = @"
                insert into Stok (StokName,StokKategorisi,StokAdet) 
                values               (@StokName,@StokKategorisi,@StokAdet) 
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {

                    myCommand.Parameters.AddWithValue("@StokName", stok.StokName);
                    myCommand.Parameters.AddWithValue("@StokKategorisi", stok.StokKategorisi);
                    myCommand.Parameters.AddWithValue("@StokAdet", stok.StokAdet);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Stok stok)
        {
            string query = @"
                update Stok
                set StokName = @StokName,
                StokKategorisi = @StokKategorisi,
                StokAdet = @StokAdet
                where StokId=@StokId 
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StokId", stok.StokId);
                    myCommand.Parameters.AddWithValue("@StokName", stok.StokName);
                    myCommand.Parameters.AddWithValue("@StokKategorisi", stok.StokKategorisi);
                    myCommand.Parameters.AddWithValue("@StokAdet", stok.StokAdet);
                    NpgsqlDataReader npgsqlDataReader = myCommand.ExecuteReader();
                    myReader = npgsqlDataReader;
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from Stok
                where StokId=@StokId 
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StokId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}
