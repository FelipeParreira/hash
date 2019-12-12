const app = require('../src/index');
const supertest = require('supertest');
const request = supertest(app);


describe('health_check endpoint', () => {
  // beforeAll(async () => {
  //   response = await request.get('/health_check');
  // });

  it('return the correct status code', done => {
    request.get('/health_check').then(response => {
      expect(response.status).toBe(200);
      expect(response.text).toBe('OK');
      done();
    });
  });
  
  // it('returns the correct text', (done) => {
  //   done();
  // });
});




