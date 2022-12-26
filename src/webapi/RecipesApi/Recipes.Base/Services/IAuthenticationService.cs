using Recipes.Base.Models;

namespace Recipes.Base.Services
{
    public interface IAuthenticationService
    {
        Task<string> AuthenticateAsync(Credentials credentials);
    }
}
