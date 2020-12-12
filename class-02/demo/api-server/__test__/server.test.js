'use strict';

const { server } = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {
    it('should respond with a 404', () => {
      return mockRequest
        .get('/bananas')
        .then(results => {
          expect(results.status).toBe(404)
        }).catch(console.error);
    });

    it('should respond properly on request to /person with a name', async () => {
      const data = { name: 'test ' }
      const response = await mockRequest.get('/person').query(data);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data);
    });

    it('should throw error if there is no person in the query', async () => {
      const data = {}
      const response = await mockRequest.get('/person').query(data);
      expect(response.status).toBe(500);
    })
})