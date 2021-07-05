# Server-Testing

## Topicsd

- automated testing.
- jest testing framework.
- supertest module.

## Assignment

For this project you will use `Test Driven Development` to create a RESTful API using `Node.js` and `Express` that publishes a set of endpoints to manage a _resource_ of your choosing. Data can be stored in memory, adding a **test database is optional**.

## Download Project and Install Dependencies

1.  fork and clone this repository.
1.  **CD into the folder** where you downloaded the repository.
1.  run `yarn` or `npm i` to download all dependencies.
1.  type `yarn test` or `npm test` to run the tests. The `test` script is already configured.

## Requirements

1.  use `jest` and `supertest` to write the tests.
1.  Your API must be able to **create** and **delete** a _resource_ of your choosing.
1.  Write a minimum of two tests per route handler.
1.  Add tests to verify that the endpoints return the correct HTTP status codes.
1.  Write the **tests BEFORE** writing the route handlers.

// GET Request Tests
//  should return a status code of 200
// check for the response body?
// the type of the response should be JSON

//POST Request Tests 
//should return a status code of 201
// should return posted data in the response body
// it should  return a JSON  response 

//DELETE Request Tests 
//should return a status code of 200 when the user is deleted
//should return the id of the deleted item 
//should make sure it is a JSON response 

//PUT Request Tests
//should return a status code of 201 when a user is updated
//should return the id of the updated item
//should make sure it is a JSON response 