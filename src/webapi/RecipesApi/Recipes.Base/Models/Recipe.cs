using Newtonsoft.Json;

namespace Recipes.Base.Models
{
    public class Recipe
    {
        [JsonProperty("id")]
        public Guid Id { get; init; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public List<string>? Steps { get; set; }

        public List<Ingredient>? Ingredients { get; set; }

        public DateTime CreatedAt { get; set; }        
    }
}