using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactWithBackend.Data;

namespace ReactWithBackendHomework5_10.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }
        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(person);
        }
        [HttpPost]
        [Route("delete")]
        public void Delete(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeletePerson(person);
        }
        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.UpdatePerson(person);
        }
        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(DeletedIds ids)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAll(ids.Ids);
        }
    }
    public class DeletedIds
    {
        public List<int> Ids { get; set; }
    }
}
