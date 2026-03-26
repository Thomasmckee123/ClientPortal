using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ClientPortal.API.Configuration;
using ClientPortal.API.DTOs;
using ClientPortal.API.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace ClientPortal.API.Services;

public class AuthService
{
    private readonly IMongoCollection<User> _users;
    private readonly JwtSettings _jwtSettings;

    public AuthService(MongoDbContext context, IOptions<JwtSettings> jwtSettings)
    {
        _users = context.Users;
        _jwtSettings = jwtSettings.Value;
    }

    public async Task<AuthResponseDto> RegisterAsync(string name, string email, string password)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();
        var existingUser = await GetUserByEmailAsync(normalizedEmail);
        if (existingUser is not null)
            throw new InvalidOperationException("A user with that email already exists.");

        var user = new User
        {
            Name = name,
            Email = normalizedEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            Role = "owner",
            CreatedAt = DateTime.UtcNow
        };

        await _users.InsertOneAsync(user);

        return BuildAuthResponse(user);
    }

    public async Task<AuthResponseDto> LoginAsync(string email, string password)
    {
        var user = await GetUserByEmailAsync(email.Trim().ToLowerInvariant());
        if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password.");

        return BuildAuthResponse(user);
    }

    public async Task<User?> GetUserByEmailAsync(string email) =>
        await _users.Find(u => u.Email == email).FirstOrDefaultAsync();

    public async Task<User?> GetUserByIdAsync(string id) =>
        await _users.Find(u => u.Id == id).FirstOrDefaultAsync();

    public string GenerateJwt(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id!),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("name", user.Name),
            new Claim("role", user.Role)
        };

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Issuer,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private AuthResponseDto BuildAuthResponse(User user) =>
        new AuthResponseDto
        {
            Token = GenerateJwt(user),
            User = new AuthUserDto
            {
                Id = user.Id!,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            }
        };
}
