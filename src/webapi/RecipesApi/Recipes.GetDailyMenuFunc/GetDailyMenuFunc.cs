using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

using Recipes.Base.Services;

using System.Threading.Tasks;

namespace Recipes.GetDailyMenuFunc
{
    public class GetDailyMenuFunc
    {
        private readonly ICosmosDbService dbService;

        public GetDailyMenuFunc(ICosmosDbService dbService)
        {
            this.dbService = dbService;
        }

        [FunctionName("GetDailyMenuFunc")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger logger)
        {
            logger.LogInformation($"Starting {nameof(GetDailyMenuFunc)}");

            var dailyMenuItems = await dbService.GetDailyMenuItemsAsync();
            
            return new OkObjectResult(dailyMenuItems);
        }
    }
}
