using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UpesiMoney.Core.Interfaces;
using UpesiMoney.Infrastructure.Persistence.Contexts;
using UpesiMoney.Infrastructure.Persistence.Repositories;

namespace UpesiMoney.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var defaultConnectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<UpesiMoneyContext>(options =>
               options.UseSqlServer(defaultConnectionString));

            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<IAtmRepository, AtmRepository>();

            return services;
        }
    }
}