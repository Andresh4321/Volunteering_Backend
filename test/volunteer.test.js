// File: tests/volunteer.test.js
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
  token = response.body.token; // Store the token for use in volunteer tests
});

describe('Volunteer Application', () => {
  test('Apply for Volunteer', async () => {
    const response = await request(app)
      .post('/api/volunteers/apply')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        birthDate: '1990-01-01',
        age: 31
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Volunteer application submitted successfully');
  });
});