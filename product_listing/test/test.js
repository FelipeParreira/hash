const app = require('../src/index');
const supertest = require('supertest');
const defaults = require('superagent-defaults');
const request = defaults(supertest(app));


describe('/health_check', () => {
  let response;

  beforeAll(async () => {
    response = await request.get('/health_check');
  });

  it('should return a 200 status code', () => {
    expect(response.status).toBe(200);
  });

  it('should return the correct text', () => {
    expect(response.text).toBe('OK');
  });
});

describe('/product', () => {
  describe('request without page', () => {
    let response;
    let json;

    beforeAll(async () => {
      response = await request.get('/product');
      json = JSON.parse(response.text);
    });

    it('should return a 200 status code', () => {
      expect(response.status).toBe(200);
    });

    it('should return a JSON', () => {
      expect(typeof json).toBe('object');
      expect(Array.isArray(json)).toBeFalsy();
    });

    it('should return a JSON with `products`', () => {
      expect(json.products).toBeDefined();
      expect(typeof json.products[0]).toBe('object');
      expect(Array.isArray(json.products[0])).toBeFalsy();
    });

    
    it('should return a JSON with `lastPage`', () => {
      expect(json.lastPage).toBeDefined();
      expect(json.lastPage).toBeGreaterThanOrEqual(json.nextPage);
    });

    it('should return a JSON with `nextPage`', () => {
      expect(json.nextPage).toBeDefined();
      expect(json.nextPage).toBe(1);
      expect(json.nextPage).toBeLessThanOrEqual(json.lastPage);
    });
  });

  describe('request with page', () => {
    let response;
    let json;
    let initialPage = 2;

    beforeAll(async () => {
      request.set({ page: initialPage });
      response = await request.get('/product');
      json = JSON.parse(response.text);
    });

    it('should return a 200 status code', () => {
      expect(response.status).toBe(200);
    });

    it('should return a JSON', () => {
      expect(typeof json).toBe('object');
      expect(Array.isArray(json)).toBeFalsy();
    });

    it('should return a JSON with `products`', () => {
      expect(json.products).toBeDefined();
      expect(typeof json.products[0]).toBe('object');
      expect(Array.isArray(json.products[0])).toBeFalsy();
    });

    
    it('should return a JSON with `lastPage`', () => {
      expect(json.lastPage).toBeDefined();
      expect(json.lastPage).toBeGreaterThanOrEqual(json.nextPage);
    });

    it('should return a JSON with `nextPage`', () => {
      expect(json.nextPage).toBeDefined();
      expect(json.nextPage).toBe(initialPage + 1);
      expect(json.nextPage).toBeLessThanOrEqual(json.lastPage);
    });
  });
});