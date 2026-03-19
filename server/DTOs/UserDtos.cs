using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientPortal.API.DTOs
{
    public class CreateUserDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int AccountId { get; set; }
    }

    public class UpdateUserDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int AccountId { get; set; }
        
    }
    public class GetUserDto
    {
        public string Id { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int AccountId { get; set; }
    }   
}