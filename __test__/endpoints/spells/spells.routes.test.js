const express = require('express');
const request = require('supertest');
const mongodb = require('../../../data/database');
const spellsRoutes = require('../../../routes/spells');
const app = express();

app.use(express.json());
app.use('/spells', spellsRoutes);

jest.mock('../../../data/database', () => ({
  getDb: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([{ name: 'Expelliarmus' }]),
  }),
}));

describe('Spells Routes', () => {
  test('GET /spells - should return 200 and a list of spells', async () => {
    const res = await request(app).get('/spells');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: 'Expelliarmus' }]);
  });
});


