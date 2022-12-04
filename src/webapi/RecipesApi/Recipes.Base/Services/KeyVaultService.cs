using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace Recipes.Base.Services
{
    public class KeyVaultService : IKeyVaultService
    {
        private string VaultUri
        {
            get
            {
                var uri = Environment.GetEnvironmentVariable("VaultUri");
                return string.IsNullOrEmpty(uri)
                    ? throw new Exception("Cannot read KeyVault URI")
                    : uri;
            }
        }

        public async Task<string> GetSecretAsync(string secretName)
        {
            var client = new SecretClient(new Uri(VaultUri), new DefaultAzureCredential());
            var secret = await client.GetSecretAsync(secretName);

            return secret?.Value?.Value == null
                ? throw new Exception($"Cannot read secret {secretName}")
                : secret.Value.Value;
        }
    }
}
