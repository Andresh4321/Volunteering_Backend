// File: tests/user.test.js
const request = require('supertest');
const app = require('../app'); // Adjust the path to your Express app

describe('User  Authentication', () => {
  test('User  Signup', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test('User  Login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined(); // Check if token is returned
  });
});