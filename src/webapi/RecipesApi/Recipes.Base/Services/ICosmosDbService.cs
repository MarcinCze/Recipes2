using Recipes.Base.Models;

namespace Recipes.Base.Services
{
    public interface ICosmosDbService
    {
        Task CreateRecipeAsync(Recipe recipe);

        Task CreateDailyMenuItemAsync(DailyMenuItem dailyMenuItem);

        Task<IEnumerable<Recipe>> GetRecipesAsync();

        Task<IEnumerable<DailyMenuItem>> GetDailyMenuItemsAsync();
    }
}
