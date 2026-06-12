namespace WebApplication1.Models;

public class UserModel
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserPassword { get; set; } = string.Empty;
    public DateTime RegisterDate { get; set; } = DateTime.UtcNow;
};