---
name: Auth Implementation
description: JWT + BCrypt authentication added to ClientPortal API - key decisions and patterns
type: project
---

JWT authentication was added to the server in March 2026. Key facts:

- BCrypt.Net-Next 4.1.0 and Microsoft.AspNetCore.Authentication.JwtBearer 8.0.0 (net8.0-compatible, NOT latest) are the auth packages.
- JwtSettings model lives in `server/Configuration/JwtSettings.cs` (Secret, Issuer, ExpiryMinutes).
- AuthService in `server/Services/AuthService.cs` owns register/login/JWT generation.
- AuthController at `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` — no [Authorize] on the controller itself, only on the `me` endpoint.
- All other controllers carry `[Authorize]` at the class level.
- User model uses `PasswordHash` (BCrypt), has `Name`, `Role` (default "owner"), `CreatedAt`.
- JWT claims: sub (userId), email, name, role. Audience == Issuer == "ClientPortal".
- appsettings files have placeholder connection strings (leaked credentials were replaced).

**Why:** Credentials were leaked in git history for the MongoDB Atlas cluster. Connection string must be supplied via environment/secrets at runtime, not committed.

**How to apply:** Never commit real connection strings. When wiring up new services, register as Scoped in Program.cs following the existing pattern.
