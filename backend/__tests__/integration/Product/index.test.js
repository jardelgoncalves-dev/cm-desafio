import request from 'supertest';
import { describe, it, expect, beforeEach } from '@jest/globals';

import app from '../../../src/app';
import { factory, truncate } from '../../utils';

describe('Product test integration', () => {
  beforeEach(async() => {
    await truncate()
  })

  it('should create a product', async () => {
    const name = 'Arroz';

    const store = await factory.create('Store');
    const store_ids = [store.dataValues.id];


    const response = await request(app).post('/product')
      .send({
        name,
        sell: 20.00,
        stores: store_ids,
      });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(name);
  })

  it('should return all product', async () => {
    await factory.create('Product')

    const response = await request(app).get('/product')

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length > 0 ).toBe(true);
  })

  it('should return a product', async () => {
    const data = await factory.create('Product')

    const response = await request(app).get(`/product/${data.dataValues.id}`)

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(data.dataValues.name);
    expect(response.body.stores).toBeDefined();
    expect(Array.isArray(response.body.stores)).toBe(true);
  })

  it('should update a product', async () => {
    const store = await factory.create('Store');
    const store_ids = [store.dataValues.id];

    const data = await factory.create('Product', {
      stores: store_ids,
    })

    const newStore = await factory.create('Store');

    const newName = 'New Product Name'

    const response = await request(app).put(`/product/${data.dataValues.id}`)
      .send({
        name: newName,
        sell: 22.00,
        stores: [...store_ids, newStore.dataValues.id]
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newName);
  })

  it('should delete a product', async () => {
    const data = await factory.create('Product')

    const response = await request(app).delete(`/product/${data.dataValues.id}`)
    expect(response.status).toBe(204);
  })
})

