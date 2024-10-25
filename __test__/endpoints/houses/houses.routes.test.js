const express = require('express');
const request = require('supertest');
const housesRoutes = require('../../../routes/houses');
const mongodb = require('../../../data/database');
const app = express();

app.use(express.json());
app.use('/houses', housesRoutes);

jest.mock('../../../data/database', () => ({
  getDb: () => ({
    collection: () => ({
      find: () => ({
        toArray: jest.fn().mockResolvedValue([
          { name: 'Gryffindor', _id: '1' },
          { name: 'Slytherin', _id: '2' },
        ]),
      }),
    }),
  }),
}));

describe('Houses Routes', () => {
  test('GET /houses - should return 200 and a list of houses', async () => {
    const res = await request(app).get('/houses');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { name: 'Gryffindor', _id: '1' },
      { name: 'Slytherin', _id: '2' },
    ]);
  });
});