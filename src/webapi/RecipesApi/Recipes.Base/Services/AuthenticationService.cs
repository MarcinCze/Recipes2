using JWT;
using JWT.Algorithms;
using JWT.Exceptions;
using JWT.Serializers;

using Recipes.Base.Models;

namespace Recipes.Base.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtAlgorithm algorithm;
        private readonly IJsonSerializer serializer;
        private readonly IBase64UrlEncoder base64Encoder;
        private readonly IJwtEncoder jwtEncoder;

        private readonly IKeyVaultService keyVaultService;

        public AuthenticationService(IKeyVaultService keyVaultService)
        {
            this.keyVaultService = keyVaultService;

            algorithm = new HMACSHA256Algorithm();
            serializer = new JsonNetSerializer();
            base64Encoder = new JwtBase64UrlEncoder();
            jwtEncoder = new JwtEncoder(algorithm, serializer, base64Encoder);
        }

        public async Task<string> AuthenticateAsync(Credentials credentials)
        {
            if (credentials == null)
                throw new ArgumentNullException(nameof(credentials));

            // TODO Add logic based on DB
            bool authenticated = credentials?.User.Equals("marcin", StringComparison.OrdinalIgnoreCase) ?? false;

            if (!authenticated)
                throw new UnauthorizedAccessException();

            IDateTimeProvider provider = new UtcDateTimeProvider();
            DateTimeOffset now = provider.GetNow().AddHours(1);
            double secondsSinceEpoch = UnixEpoch.GetSecondsSince(now);

            Dictionary<string, object> claims = new()
            {
                { "username", credentials.User },
                { "role", "admin"},
                { "exp", secondsSinceEpoch }
            };

            string key = await keyVaultService.GetSecretAsync("JwtKey");
            string token = jwtEncoder.Encode(claims, key);

            try
            {
                await TokenValidationAsync(token);
            }
            catch (Exception)
            {
                throw new Exception("Error when generating token");
            }

            return token;
        }

        public async Task TokenValidationAsync(string token)
        {
            try
            {
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider, ValidationParameters.Default);
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, base64Encoder, algorithm);

                string key = await keyVaultService.GetSecretAsync("JwtKey");
                var json = decoder.Decode(token, key, true);
            }
            catch (TokenNotYetValidException)
            {
                Console.WriteLine("Token is not valid yet");
            }
            catch (TokenExpiredException)
            {
                Console.WriteLine("Token has expired");
            }
            catch (SignatureVerificationException)
            {
                Console.WriteLine("Token has invalid signature");
            }
        }
    }
}
