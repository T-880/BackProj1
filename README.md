# Projektuppgift - Backend-baserad webbutveckling, BACKEND

Detta är en backendapplikation byggd med Node.js, Express och MongoDB. API:et fungerar som en REST-baserad webbtjänst för ett fiktivt restaurangföretag (Forno Nero) och hanterar meny, användare och autentisering.

Systemet är uppbyggt som ett headless CMS där data lagras i MongoDB och konsumeras av en separat frontend- och administrationsapplikation via JSON.

API:et hanterar autentisering med registrering av användarkonton, inloggning samt skyddade routes med JWT (JSON Web Tokens).

Backend fungerar som ett REST API som konsumeras av en frontendapplikation och ett administrationsgränssnitt via Fetch API.

---

## Funktion

API:et erbjuder följande funktionalitet:

- Registrera nya användarkonton (POST) *(skyddad route, kräver chef-roll)*
- Logga in och generera JWT-token (POST)
- Hasha lösenord innan lagring i databasen (bcrypt)
- Skydda routes med JWT-autentisering (middleware)
- Rollbaserad åtkomstkontroll (chef/admin)
- CRUD för menyobjekt:
  - Skapa menyobjekt (POST)
  - Hämta alla menyobjekt (GET)
  - Uppdatera menyobjekt (PUT)
  - Radera menyobjekt (DELETE)
- Returnera data i JSON-format för konsumtion av frontend

---

## Autentisering

API:et använder JWT (JSON Web Token) för autentisering.

Flödet fungerar enligt följande:

- Vid registrering skapas en användare och lösenord hashas med bcrypt
- Vid inloggning verifieras lösenordet mot hash i databasen
- Om inloggning är korrekt genereras en JWT-token
- Token skickas tillbaka till klienten
- Skyddade routes kräver token i request header
- Token verifieras i middleware innan åtkomst ges
- Användarens roll (admin/chef) inkluderas i token och används för behörighet

---

## Databas

Applikationen använder MongoDB som databas via Mongoose.

### User-schema:

- username (String, unikt)
- password (String, hashad med bcrypt)
- fullName (String)
- phone (String)
- role (String: "chef" eller "admin")

### MenuItem-schema:

- title (String)
- description (String)
- price (Number)
- category (String)
- imageUrl (String)
- monthly_special (Boolean)
- created_at (Date)
- created_by (referens till User)

---

## Säkerhet

- Lösenord hashas med bcrypt innan lagring
- Lösenord lagras aldrig i klartext
- JWT används för autentisering och sessionshantering
- Rollbaserad åtkomstkontroll (RBAC) implementerad
- Skyddade routes kräver giltig token
- Obehöriga requests returnerar statuskod 401 eller 403
- Validering sker i backend innan databasanrop

---

## Middleware

Systemet använder två middleware-funktioner:

- **authMiddleware**
  - Verifierar JWT-token
  - Hämtar userId och role från token
  - Stoppar obehöriga requests

- **roleMiddleware**
  - Kontrollerar användarens roll
  - Begränsar åtkomst till specifika endpoints (t.ex. chef/admin)

---

## Tekniker

- Node.js  
- Express  
- MongoDB (Mongoose)  
- bcrypt  
- JWT (jsonwebtoken)  
- CORS  
- dotenv  
- nodemon (utveckling)

---

## API-endpoints

### Auth
- POST `/api/auth/login` – logga in och få JWT
- POST `/api/auth/register` – skapa användare (endast chef)
- GET `/api/auth/users` – hämta alla användare (chef)
- DELETE `/api/auth/users/:id` – ta bort användare (chef)

### Menu
- GET `/api/menu` – hämta alla menyobjekt (publik)
- POST `/api/menu` – skapa menyobjekt (admin/chef)
- PUT `/api/menu/:id` – uppdatera menyobjekt (admin/chef)
- DELETE `/api/menu/:id` – radera menyobjekt (chef)

---

## Koppling till frontend

API:et används av både en publik frontend och ett administrationsgränssnitt via följande bas-URL:


http://localhost:5000/api
