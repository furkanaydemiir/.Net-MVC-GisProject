using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Data;
using WebApplication1.Dtos;

namespace WebApplication1.Business;

public interface IAuthService
{
    string Login(LoginDto dto);
}

public class AuthManager : IAuthService
{
    private readonly AppDbContext _context;

    public AuthManager(AppDbContext context)
    {
        _context = context;
    }

    public string Login(LoginDto dto)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.UserName == dto.UserName && u.UserPassword == dto.UserPassword);

        if (user == null)
        {
            throw new Exception("Kullanıcı adı veya şifre hatalı!");
        }

        var claims = new[]
        {
          new Claim("id",user.Id.ToString()),
          new Claim("username",user.UserName)

        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("cOkGiZlİaNaHtARYaPAnFuRkaNaYDEmİr"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenOptions = new JwtSecurityToken(
            issuer: "backend", // Tokenı kim üretti
            audience: "ReactClient", // Tokenı kim kullancak
            claims: claims, // Tokenın içindeki kullanıcı bilgileri
            expires: DateTime.UtcNow.AddDays(1), // Bu kimlik kartı ne kadar geçerli olucak
            signingCredentials: creds // şifrelenme türü
        );
        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions); 

        return tokenString;
    }
}