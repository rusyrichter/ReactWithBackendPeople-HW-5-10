using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactWithBackend.Data
{
    public class PersonRepository
    {
        public string _connectionString { get; set; }

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }
        public void AddPerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Add(person);
            context.SaveChanges();
        }
        public void DeletePerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {person.Id}");
        }

        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"Update People set FirstName = {person.FirstName},
                                                       LastName = {person.LastName}, Age = {person.Age}                                                      Where Id = {person.Id}");
        }
        public void DeleteAll(List<int> idsToDelete)
        {
            using var context = new PeopleDbContext(_connectionString);
            var peopleToDelete = context.People.Where(p => idsToDelete.Contains(p.Id));
            context.People.RemoveRange(peopleToDelete);
            context.SaveChanges();
        }
    }
}
