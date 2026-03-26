---
name: Server Architecture
description: ASP.NET Core 8 + MongoDB architecture overview for ClientPortal API
type: project
---

- Framework: ASP.NET Core 8 Web API, targeting net8.0, C# file-scoped namespaces.
- Database: MongoDB via MongoDB.Driver 3.7.0. Context class is `MongoDbContext` in `server/Configuration/`. Settings model is `MongoDbSettings`.
- Service pattern: each domain has a Service class (scoped) + Controller. Services take `MongoDbContext` via constructor injection. No repository abstraction layer.
- DTOs: separate Create/Update/Get DTOs per entity in `server/DTOs/`. Controllers map between DTOs and models manually (no AutoMapper).
- All controllers under `api/[controller]` convention except AuthController which uses `api/auth`.
- CORS policy named "AllowClient", allows http://localhost:5173 with credentials (Vite dev server).
- Swagger enabled in Development only.
- Models use MongoDB.Bson attributes (BsonId, BsonRepresentation).

**How to apply:** Follow the existing Service → Controller → DTO pattern for any new domain entity. Register new services as Scoped in Program.cs.
