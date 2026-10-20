import { assert, describe, expect, it } from 'vitest'
import request from 'supertest'
import {app} from '../src/routes'

describe('GET /events', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/events')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('responds with specific event', function(done) {
    request(app)
      .get('/events/13')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
            "id": 13,
            "date": "2026-10-20 08:00:00",
            "amount_in_ml": 5000,
            "drink_type": "tea"
            }, done);
  });
});


