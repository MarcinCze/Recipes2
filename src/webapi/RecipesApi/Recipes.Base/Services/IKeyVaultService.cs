namespace Recipes.Base.Services
{
    public interface IKeyVaultService
    {
        Task<string> GetSecretAsync(string secretName);
    }
}
