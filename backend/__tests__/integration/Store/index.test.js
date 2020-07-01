import request from 'supertest';
import { describe, it, expect, beforeEach } from '@jest/globals';

import app from '../../../src/app';
import { factory, truncate } from '../../utils';

describe('Store test integration', () => {
  beforeEach(async() => {
    await truncate()
  })

  it('should create a store', async () => {
    const response = await request(app)
    .post('/store')
    .send({
      name: 'Loja 1'
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe('Loja 1');
  })

  it('should return all store', async () => {
    await factory.create('Store')

    const response = await request(app).get('/store')

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length > 0 ).toBe(true);
  })

  it('should return a store', async () => {
    const data = await factory.create('Store')

    const response = await request(app).get(`/store/${data.dataValues.id}`)
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(data.dataValues.name);
  })

  it('should update a store', async () => {
    const data = await factory.create('Store')

    const newName = 'New Name'
    const response = await request(app)
      .put(`/store/${data.dataValues.id}`)
      .send({
        name: newName
      })

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newName);
  })

  it('should delete a store', async () => {
    const data = await factory.create('Store')

    const response = await request(app).delete(`/store/${data.dataValues.id}`)
    expect(response.status).toBe(204);
  })
})

