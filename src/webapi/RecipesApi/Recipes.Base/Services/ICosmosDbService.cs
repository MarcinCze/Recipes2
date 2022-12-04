using Recipes.Base.Models;

namespace Recipes.Base.Services
{
    public interface ICosmosDbService
    {
        Task CreateRecipeAsync(Recipe recipe);

        Task<List<Recipe>> GetRecipesAsync();
    }
}
