// File: tests/donation.test.js
const request = require('supertest');
const app = require('../app'); // Adjust the path to your Express app

let token;

beforeAll(async () => {
  // Assuming you have a function to get a valid token for testing
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'jane.doe@example.com',
      password: 'password123'
    });
  token = response.body.token; // Store the token for use in donation tests
});

describe('Donation', () => {
  test('Create Donation', async () => {
    const response = await request(app)
      .post('/api/donations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pinCode: '123456',
        amount: 100,
        personalMessage: 'Keep up the good work!'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Donation processed successfully');
  });
});