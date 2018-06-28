/* 
when making a Get to the / endpoint the API should resppond with status code 200
and the following JSON object :{api 'running}
*/

const server = require( './server' );

describe( 'server.js', () =>
{
    it( 'should return OK and a JSON object from the index route', () =>
    {
        const expectedStatusCode = 200;
        const expectedBody = { api: 'running' };  
    })
})
