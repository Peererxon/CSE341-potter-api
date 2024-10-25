const express = require('express');
const request = require('supertest');
const charactersRoutes = require('../../../routes/characters');
const mongodb = require('../../../data/database');
const app = express();

app.use(express.json());
app.use('/characters', charactersRoutes);

jest.mock('../../../data/database', () => ({
  getDb: () => ({
    collection: () => ({
      find: () => ({
        toArray: jest.fn().mockResolvedValue([
          { name: 'Harry Potter', _id: '1' },
          { name: 'Hermione Granger', _id: '2' },
        ]),
      }),
    }),
  }),
}));

describe('Characters Routes', () => {
  test('GET /characters - should return 200 and a list of characters', async () => {
    const res = await request(app).get('/characters');
    expect(res.statusCode).toBe(200); 
    expect(res.body).toEqual([
      { name: 'Harry Potter', _id: '1' },
      { name: 'Hermione Granger', _id: '2' }
    ]);
  });
});