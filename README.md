# CSE341 Potter API

## Table of Contents

- [CSE341 Potter API](#cse341-potter-api)
  - [Purpose](#Purpose)
  - [Table of Contents](#table-of-contents)
  - [Data Collections](#data-collections)
  - [Collections and Attributes](#collections-and-attributes)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Configuration](#configuration)
  - [License](#license)

### Purpose:
The **CSE341 Potter API** is an API designed for Harry Potter fans and developers, providing easy access to detailed data about the Harry Potter universe. The API allows users to retrieve information about **Characters**, **Houses**, **Spells**, and **Movies** through various endpoints. This data can be used to create applications, websites, or to simply explore the magical world of Harry Potter.

### Data Collections:
The API provides access to the following collections:

1. **Houses**  
2. **Characters**  
3. **Spells**  
4. **Movies**  

Each collection comes with specific attributes that are returned in the JSON format upon making GET requests.

### Collections and Attributes

#### 1. **Houses**
   - **Attributes**:
     - `id`: Unique identifier
     - `name`: Name of the house
     - `houseColors`: Colors representing the house
     - `animal`: The house mascot
     - `founder`: The founder of the house
     - `commonRoom`: The name of the common room
     - `houseHead`: The current head of the house
     - `houseGhost`: The ghost associated with the house

#### 2. **Characters**
   - **Attributes**:
     - `id`: Unique identifier 
     - `fullName`: The full name of the character
     - `house`: The house they belong to
     - `birthdate`: The character's birthdate
     - `bloodStatus`: The character's blood status
     - `patronus`: The patronus form of the character

#### 3. **Spells**
   - **Attributes**:
     - `id`: Unique identifier 
     - `spellName`: The name of the spell
     - `spellType`: The type of the spell
     - `use`: The primary use of the spell
     - `difficulty`: The difficulty level
     - `effects`: The effects of the spell

#### 4. **Movies**
   - **Attributes**:
     - `id`: Unique identifier 
     - `movieName`: The name of the movie
     - `director`: The director of the movie
     - `runtime`: The total runtime of the movie in minutes
     - `seriesNumber`: The number in the Harry Potter series
     - `duration`: The movie duration
     - `rating`: The movie rating
     - `releaseDate`: The release date of the movie

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm package manager
- MongoDB database
- Google OAuth 2.0 credentials

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Peererxon/CSE341-potter-api.git
   cd CSE341-potter-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   COOKIE_KEY=your_secret_cookie_key
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

## Usage

### Live API

The API is deployed and accessible at: `https://cse341-potter-api-gtxt.onrender.com`

### Local Development

1. Start the server: `npm start`
2. Visit `http://localhost:3000` to access the API
3. View API documentation at `http://localhost:3000/api-docs`

### Authentication

To access protected endpoints (POST, PUT, DELETE), you need to authenticate:

1. Visit `/auth/google` to login with Google
2. After successful authentication, you can access protected routes

### API Endpoints

#### Characters
- `GET /characters/` - Fetch all characters
- `GET /characters/{id}` - Fetch a character by ID
- `GET /characters/house/{house}` - Fetch characters by house
- `POST /characters/` - Create a new character (Auth required)
- `PUT /characters/{id}` - Update a character (Auth required)
- `DELETE /characters/{id}` - Delete a character (Auth required)

#### Houses
- `GET /houses/` - Fetch all houses
- `GET /houses/{id}` - Fetch a house by ID
- `POST /houses/` - Create a new house (Auth required)
- `PUT /houses/{id}` - Update a house (Auth required)
- `DELETE /houses/{id}` - Delete a house (Auth required)

#### Spells
- `GET /spells/` - Fetch all spells
- `GET /spells/{id}` - Fetch a spell by ID
- `POST /spells/` - Create a new spell (Auth required)
- `PUT /spells/{id}` - Update a spell (Auth required)
- `DELETE /spells/{id}` - Delete a spell (Auth required)

#### Movies
- `GET /movies/` - Fetch all movies
- `GET /movies/{id}` - Fetch a movie by ID
- `POST /movies/` - Create a new movie (Auth required)
- `PUT /movies/{id}` - Update a movie (Auth required)
- `DELETE /movies/{id}` - Delete a movie (Auth required)

### Example Requests

```bash
# Get all characters
curl https://cse341-potter-api-gtxt.onrender.com/characters/

# Get a specific character by ID
curl https://cse341-potter-api-gtxt.onrender.com/characters/{id}

# Get characters by house
curl https://cse341-potter-api-gtxt.onrender.com/characters/house/Gryffindor
```

## Features

- ✨ **RESTful API** with full CRUD operations
- 🔐 **OAuth 2.0 Authentication** with Google using Passport.js
- 📚 **Interactive Swagger Documentation** auto-generated
- 🏰 **Harry Potter Universe Data** (Characters, Houses, Spells, Movies)
- 🗄️ **MongoDB Database** integration with proper error handling
- 🧪 **Jest Testing Framework** with comprehensive coverage
- 🚀 **Deployed on Render** for easy access
- 🛡️ **Input Validation** using ValidatorJS
- 📊 **CORS Support** for cross-origin requests
- 🔄 **Session Management** with express-session

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3000 |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes | - |
| `GOOGLE_CALLBACK_URL` | OAuth callback URL | Yes | - |
| `COOKIE_KEY` | Secret key for sessions | Yes | - |

### Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage (configured in jest.config.ts)
npm run test
```

The Jest configuration covers:
- Route handlers testing
- Server functionality testing
- Authentication flow testing
- Excludes auth, index, and swagger routes from coverage

### Database Setup

Ensure your MongoDB database is running and accessible. The application will connect using the `MONGODB_URI` environment variable. The database connection is initialized in `data/database.js`.

### Project Structure

```
CSE341-potter-api/
├── controllers/          # Business logic for each resource
├── routes/              # API route definitions
├── middleware/          # Custom middleware functions
├── data/               # Database configuration
├── __test__/           # Test suites
├── rest/               # REST client files for testing
├── server.js           # Main application entry point
├── passportSetup.js    # Google OAuth configuration
├── swagger.js          # Swagger documentation generator
└── swagger.json        # Auto-generated API documentation
```

## License

This project is licensed under the **ISC License**.

---
