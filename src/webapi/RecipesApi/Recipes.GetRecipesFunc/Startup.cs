using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

using Recipes.Base.Services;

[assembly: FunctionsStartup(typeof(Recipes.GetRecipesFunc.Startup))]
namespace Recipes.GetRecipesFunc
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddLogging();

            builder.Services
                .AddSingleton<IKeyVaultService, KeyVaultService>()
                .AddSingleton<ICosmosDbService, CosmosDbService>();
        }
    }
}
