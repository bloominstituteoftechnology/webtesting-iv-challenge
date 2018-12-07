

//==============================================================================

//------------------------------------------------
const request = require('supertest');
const server = require('./server.js');
const resourceManager = require('./resource_manager.js');
const config = require('./config.js');


//==============================================================================

describe('Test API Server', () => {

//------------------------------------------------
    describe('Test Retrieve Resource', () => {
        //
        const testUrl = `${config.URL_API_RESOURCE}/1`;
        //
        beforeEach(async function () {
            await resourceManager.clear();
            await resourceManager.insert({
                [config.FIELD_NAME]: 'Test Resource',
                [config.FIELD_DATA]: 'Test Data'    ,
            });
        });
        //
        test('responds with status code 200', async function () {
            let response = await request(server).get(testUrl);
            expect(response.status).toBe(200);
        });
        test('responds with status code 404', async function () {
            let response = await request(server).get(
                `${config.URL_API_RESOURCE}/2`,
            );
            expect(response.status).toBe(404);
        });
        test('responds with JSON object', async function () {
            let response = await request(server).get(testUrl);
            expect(response.type).toBe('application/json');
        });
        test('responds with requested data', async function () {
            let response = await request(server).get(testUrl);
            expect(response.body.hasOwnProperty(config.FIELD_NAME)).toBeTruthy();
            expect(response.body.hasOwnProperty(config.FIELD_DATA)).toBeTruthy();
        });
    });

//------------------------------------------------
    describe('Test Create Resource', () => {
        //
        const testUrl = config.URL_API_RESOURCE;
        const testData = {
            [config.FIELD_NAME]: 'Test Resource',
            [config.FIELD_DATA]: 'Test Data'    ,
        };
        //
        beforeEach(async function () {
            await resourceManager.clear();
        });
        //
        test('responds with status code 201', async function () {
            let response = await request(server).post(testUrl).send(testData);
            expect(response.status).toBe(201);
        });
        test('responds with status code 400', async function () {
            // Malformed request, no name or data
            let response = await request(server).post(testUrl).send({});
            expect(response.status).toBe(400);
        });
        test('responds with JSON object', async function () {
            let response = await request(server).post(testUrl).send(testData);
            expect(response.type).toBe(config.MIME_APPLICATION_JSON);
        });
        test('responds with id of created resource', async function () {
            let response = await request(server).post(testUrl).send(testData);
            expect(response.body).toEqual({id: 1});
        });
    });
});
