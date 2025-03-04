// File: tests/login.test.js
const request = require('supertest');
const app = require('../app'); // Adjust the path to your Express app

describe('User  Login', () => {
  test('Successful Login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane.doe@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined(); // Check if token is returned
  });

  test('Login with Invalid Credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane.doe@example.com',
        password: 'wrongpassword'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });
});