using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

using Recipes.Base.Services;

using System.Threading.Tasks;

namespace Recipes.GetRecipesFunc
{
    public class GetRecipesFunc
    {
        private readonly ICosmosDbService dbService;

        public GetRecipesFunc(ICosmosDbService dbService)
        {
            this.dbService = dbService;
        }

        [FunctionName("GetRecipesFunc")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var recipes = await dbService.GetRecipesAsync();
            return new OkObjectResult(recipes);
        }
    }
}
