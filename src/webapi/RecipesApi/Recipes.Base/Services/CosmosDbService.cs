using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

using Recipes.Base.Models;

namespace Recipes.Base.Services
{
    public class CosmosDbService : ICosmosDbService
    {
        private const string DatabaseName = "recipes-db";
        private const string RecipeContainerName = "recipes-container";
        private const string DailyItemContainerName = "dailymenu-container";

        private readonly ILogger logger;
        private readonly IKeyVaultService keyVaultService;

        public CosmosDbService(IKeyVaultService keyVaultService, ILogger logger)
        {
            this.keyVaultService = keyVaultService;
            this.logger = logger;
        }

        public async Task CreateDailyMenuItemAsync(DailyMenuItem dailyMenuItem)
            => await SaveDocumentAsync<DailyMenuItem>(
                document: dailyMenuItem, 
                containerName: DailyItemContainerName, 
                partitionKey: new PartitionKey(dailyMenuItem.Id.ToString()));


        public async Task CreateRecipeAsync(Recipe recipe)
            => await SaveDocumentAsync<Recipe>(
                document: recipe,
                containerName: RecipeContainerName,
                partitionKey: new PartitionKey(recipe.Id.ToString()));

        public async Task<IEnumerable<DailyMenuItem>> GetDailyMenuItemsAsync()
            => await GetAllDocumentsAsync<DailyMenuItem>(DailyItemContainerName);

        public async Task<IEnumerable<Recipe>> GetRecipesAsync()
            => await GetAllDocumentsAsync<Recipe>(RecipeContainerName);

        private async Task SaveDocumentAsync<T>(T document, string containerName, PartitionKey partitionKey)
            where T : class
        {
            using CosmosClient client = new(
                await keyVaultService.GetSecretAsync("CosmosAccountEndpoint"),
                await keyVaultService.GetSecretAsync("CosmosAuthKey")
            );

            Database database = client.GetDatabase(DatabaseName);
            Container container = database.GetContainer(containerName);

            T createdItem = await container.CreateItemAsync<T>(
                item: document,
                partitionKey: partitionKey
            );
        }

        private async Task<IEnumerable<T>> GetAllDocumentsAsync<T>(string containerName)
            where T : class
        {
            List<T> results = new();

            using CosmosClient client = new(
                await keyVaultService.GetSecretAsync("CosmosAccountEndpoint"),
                await keyVaultService.GetSecretAsync("CosmosAuthKey")
            );

            Database database = client.GetDatabase(DatabaseName);
            Container container = database.GetContainer(containerName);

            QueryDefinition definition = new("SELECT * FROM c");

            FeedIterator<T> iterator = container.GetItemQueryIterator<T>(definition);
            while (iterator.HasMoreResults)
            {
                FeedResponse<T> responseResults = await iterator.ReadNextAsync();
                results.AddRange(responseResults);
            }

            return results;
        }
    }
}
