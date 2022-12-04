using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

using Recipes.Base.Models;

namespace Recipes.Base.Services
{
    public class CosmosDbService : ICosmosDbService
    {
        private const string DatabaseName = "recipes-db";
        private const string ContainerName = "recipes-container";

        private readonly ILogger logger;
        private readonly IKeyVaultService keyVaultService;

        public CosmosDbService(IKeyVaultService keyVaultService, ILogger logger)
        {
            this.keyVaultService = keyVaultService;
            this.logger = logger;
        }

        public async Task CreateRecipeAsync(Recipe recipe)
        {
            using CosmosClient client = new(
                await keyVaultService.GetSecretAsync("CosmosAccountEndpoint"),
                await keyVaultService.GetSecretAsync("CosmosAuthKey")
            );

            Database database = client.GetDatabase(DatabaseName);
            Container container = database.GetContainer(ContainerName);
            
            Recipe createdItem = await container.CreateItemAsync<Recipe>(
                item: recipe,
                partitionKey: new PartitionKey(recipe.Id.ToString())
            );
        }

        public async Task<List<Recipe>> GetRecipesAsync()
        {
            List<Recipe> results = new();

            using CosmosClient client = new(
                await keyVaultService.GetSecretAsync("CosmosAccountEndpoint"),
                await keyVaultService.GetSecretAsync("CosmosAuthKey")
            );

            Database database = client.GetDatabase(DatabaseName);
            Container container = database.GetContainer(ContainerName);

            QueryDefinition definition = new("SELECT * FROM c");

            FeedIterator<Recipe> iterator = container.GetItemQueryIterator<Recipe>(definition);
            while (iterator.HasMoreResults)
            {
                FeedResponse<Recipe> responseResults = await iterator.ReadNextAsync();
                foreach (var item in responseResults)
                {
                    results.Add(item);
                }
            }

            return results;
        }
    }
}
