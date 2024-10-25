const express = require('express');
const request = require('supertest');
const mongodb = require('../../../data/database');
const moviesRoutes = require('../../../routes/movies');
const app = express();

app.use(express.json());
app.use('/movies', moviesRoutes);

jest.mock('../../../data/database', () => ({
  getDb: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([{ title: 'Philosopher\'s Stone' }]),
  }),
}));

describe('Movies Routes', () => {
  test('GET /movies - should return 200 and a list of movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ title: 'Philosopher\'s Stone' }]);
  });
});