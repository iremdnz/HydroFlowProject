﻿using System.Data;

namespace HydroFlowProject.Models
{
    public class UserRole
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int RoleId { get; set; }

        public byte[] UserRoleDate { get; set; } = null!;

        public virtual Role Role { get; set; } = null!;

        public virtual User User { get; set; } = null!;
    }
}
