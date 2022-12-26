using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

using Recipes.Base.Models;

using System;
using System.Net;
using System.Threading.Tasks;

namespace Recipes.AuthenticateFunc
{
    public class AuthenticateFunc
    {
        private readonly Base.Services.IAuthenticationService authenticationService;

        public AuthenticateFunc(
            Base.Services.IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [FunctionName("AuthenticateFunc")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]
            Credentials credentials,
            ILogger log)
        {
            try
            {
                string result = await authenticationService.AuthenticateAsync(credentials);
                return new OkObjectResult(result);
            }
            catch (UnauthorizedAccessException)
            {
                return new ObjectResult("Error 401 Unauthorized")
                {
                    StatusCode = (int?)HttpStatusCode.Unauthorized
                };
            }
        }
    }
}
