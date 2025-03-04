// File: tests/signup.test.js
const request = require('supertest');
const app = require('../app'); // Adjust the path to your Express app

describe('User  Signup', () => {
  test('Successful Signup', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test('Signup with Existing Email', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User  already exists');
  });
});