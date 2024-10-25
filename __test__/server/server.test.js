const request = require('supertest');
const { app } = require('../../server');

jest.mock('../../data/database', () => ({
  initDb: jest.fn((callback) => callback(null, {})),
}));

describe('Server Tests', () => {
  test('GET / - should return "Logged out" when not authenticated', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Logged out');
  });
});

afterAll((done) => {
  if (app.close) {
    app.close(done);
  } else {
    done();
  }
});