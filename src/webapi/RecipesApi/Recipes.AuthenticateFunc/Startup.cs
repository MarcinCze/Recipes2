using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

using Recipes.Base.Services;

[assembly: FunctionsStartup(typeof(Recipes.AuthenticateFunc.Startup))]
namespace Recipes.AuthenticateFunc
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddLogging();

            builder.Services
                .AddSingleton<IAuthenticationService, AuthenticationService>()
                .AddSingleton<IKeyVaultService, KeyVaultService>();
        }
    }
}
