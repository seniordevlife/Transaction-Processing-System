using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace UpesiMoney.Core
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddAppCore(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}
