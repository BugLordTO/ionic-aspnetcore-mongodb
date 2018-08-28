using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using myapi.Models;

namespace myapi.Controllers
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        IMongoCollection<Student> Collection { get; set; }

        public StudentController()
        {
            var settings = MongoClientSettings.FromUrl(new MongoUrl("mongodb://ezstudentadmin:EzStudent1@ds235302.mlab.com:35302/ez-student"));
            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            var mongoClient = new MongoClient(settings);
            var database = mongoClient.GetDatabase("ez-student");
            Collection = database.GetCollection<Student>("students");
        }

        [HttpGet("[action]")]
        public IEnumerable<Student> List()
        {
            return Collection.Find(x => true).ToList();
        }

        [HttpGet("[action]/{id}")]
        public Student Get(string id)
        {
            return Collection.Find(x => x.Id == id).FirstOrDefault();
        }

        [HttpPost("[action]")]
        public void Create([FromBody]Student request)
        {
            request.Id = Guid.NewGuid().ToString();
            Collection.InsertOne(request);
        }

        [HttpPost("[action]")]
        public void Edit([FromBody]Student request)
        {
            Collection.ReplaceOne(x => x.Id == request.Id, request);
        }

        [HttpPost("[action]/{id}")]
        public void Delete(string id)
        {
            Collection.DeleteOne(x => x.Id == id);
        }
    }
}
