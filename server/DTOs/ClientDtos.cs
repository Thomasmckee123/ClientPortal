namespace ClientPortal.API.DTOs;

public class CreateClientDto
{
    public int UserId { get; set; }
    public string Name { get; set; } = null!;
    public double Balance { get; set; }
    public int UserTypeId { get; set; }
}

public class UpdateClientDto
{
    public int UserId { get; set; }
    public string Name { get; set; } = null!;
    public double Balance { get; set; }
    public int UserTypeId { get; set; }
}
