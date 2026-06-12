using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Business;


public class UserManager : IUserService
{
    private readonly AppDbContext _context;

    public UserManager(AppDbContext context)
    {
        _context = context;
    }
    public List<UserModel> GetAllUsers()
    {
       return _context.Users.ToList();
    }
    public UserModel GetUserById(int id)
    {
        return _context.Users.Find(id);        
    }
    public UserModel CreateUser(CreateUserDto dto)
    { 
       var isUnique = !_context.Users.Any(u=>u.UserName == dto.UserName);

        if (!isUnique)
        {
            throw new Exception("Bu isim daha önce alınmış");
        }
      var newUser = new UserModel
      {  
          UserName = dto.UserName,
          UserPassword = dto.UserPassword,
          RegisterDate = DateTime.UtcNow
      };

      _context.Users.Add(newUser);
      _context.SaveChanges();
      return newUser;
    }
    public bool UpdateUser(int id,[FromBody]UpdateUserDto dto)
    {
     var user = _context.Users.Find(id);
     if(user == null)
        {
            return false;
        }
     user.UserName = dto.UserName;
     user.UserPassword = dto.UserPassword;
     _context.SaveChanges();
     return true;
    }
    public bool DeleteUser(int id)
    {
        var user = _context.Users.Find(id);
        if(user is null)
        {
            return false;
        }
        _context.Remove(user);
        _context.SaveChanges();
        return true;
    }
}