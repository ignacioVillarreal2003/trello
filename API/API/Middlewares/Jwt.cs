using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API;

public class Jwt : IJwt
{
    private IConfiguration _configuration;

    public Jwt(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerarToken(string email)
    {
        var claims = new[]
        {
            new Claim("email", email)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["ConfigurationJwt:Llave"] ?? string.Empty));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: claims,
            expires: DateTime.Now.AddMinutes(60),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}