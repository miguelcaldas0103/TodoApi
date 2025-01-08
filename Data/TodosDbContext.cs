using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class TodosDbContext : DbContext
    {
        public TodosDbContext(DbContextOptions<TodosDbContext> options) : base(options) { }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}