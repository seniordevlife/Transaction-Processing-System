using Microsoft.EntityFrameworkCore;
using UpesiMoney.Core.Entities;

namespace UpesiMoney.Infrastructure.Persistence.Contexts
{
    public class UpesiMoneyContext : DbContext
    {
        public UpesiMoneyContext(DbContextOptions<UpesiMoneyContext> options) : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Atm> Atms { get; set; }
    }
}