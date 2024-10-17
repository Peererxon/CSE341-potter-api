const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341 | Harry Potter API',
        description: 'The CSE341 Potter API is an API designed for Harry Potter fans, providing information about the Harry Potter universe.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        characters: {
            fullName: "Draco Malfoy",
            house: "Slytherin",
            birthdate: "1980-06-05",
            bloodStatus: "Pure-blood",
            patronus: "None"
        },
        houses: {
            name: "Gryffindor",
            houseColors: [
                "Red",
                "Gold"
            ],
            animal: "Lion",
            founder: "Godric Gryffindor",
            commonRoom: "Gryffindor Tower",
            houseHead: "Minerva McGonagall",
            houseGhost: "Nearly Headless Nick",   
        },
        movies: {
            movieName: "Harry Potter and the Sorcerer's Stone",
            director: "Chris Columbus",
            runtime: "152 minutes",
            seriesNumber: 1,
            duration: "2h 32m",
            rating: "PG",
            releaseDate: "2001-11-16"
        },
        spells: {
            spellName: "Expecto Patronum",
            spellType: "Charm",
            use: "Protection against Dementors",
            difficulty: "Advanced",
            effects: "Conjures a protective Patronus to ward off Dementors."
        }
        
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
