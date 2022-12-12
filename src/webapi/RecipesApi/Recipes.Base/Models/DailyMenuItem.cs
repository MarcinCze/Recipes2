using Newtonsoft.Json;

namespace Recipes.Base.Models
{
    public class DailyMenuItem
    {
        [JsonProperty("id")]
        public Guid Id { get; init; }

        public Guid? RecipeId { get; set; }

        public string? Name { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int Day { get; set; }
    }
}
