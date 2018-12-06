const request = require('supertest');
const server = require('./api/server.js');
const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

beforeEach(async () => {
  await db('names')
    .insert({ name: 'steve' });
});

afterEach(async () => {
  await db('names').truncate();
});

beforeAll(async () => {
  await db('names').truncate();
});


describe('DELETE /:id endpoint', () => {

  it('should return with "count: 0" if it fails', async () => {
    let response = await request(server).delete('/5')
    expect(response.body).toEqual({ count: 0 });

  });

  it('should respond with status 200 if successful', async () => {
    let response = await request(server).delete('/1')
    expect(response.status).toBe(200);

  });  

  it('should respond with the number of records deleted', async () => {
    let response = await request(server).delete('/1')
    expect(response.body).toEqual({ count: 1 });
  })
})
