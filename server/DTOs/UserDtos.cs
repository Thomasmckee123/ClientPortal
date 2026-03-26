namespace ClientPortal.API.DTOs;

public class CreateUserDto
{
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Role { get; set; } = "owner";
    public int AccountId { get; set; }
}

public class UpdateUserDto
{
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Password { get; set; }
    public string Role { get; set; } = null!;
    public int AccountId { get; set; }
}

public class GetUserDto
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public int AccountId { get; set; }
    public DateTime CreatedAt { get; set; }
}
