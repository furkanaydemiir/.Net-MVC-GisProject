using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Business;


public interface IUserService
{
    List<UserModel> GetAllUsers();
     
    UserModel GetUserById(int id);

    UserModel CreateUser(CreateUserDto dto);

    bool UpdateUser(int id, UpdateUserDto dto);

    bool DeleteUser(int id); 
}