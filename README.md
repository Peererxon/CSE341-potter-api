# CSE341 Potter API

### Purpose:
The **CSE341 Potter API** is an API designed for Harry Potter fans and developers, providing easy access to detailed data about the Harry Potter universe. The API allows users to retrieve information about **Characters**, **Houses**, **Spells**, and **Movies** through various endpoints. This data can be used to create applications, websites, or to simply explore the magical world of Harry Potter.

### Data Collections:
The API provides access to the following collections:

1. **Houses**  
2. **Characters**  
3. **Spells**  
4. **Movies**  

Each collection comes with specific attributes that are returned in the JSON format upon making GET requests.

---

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

---