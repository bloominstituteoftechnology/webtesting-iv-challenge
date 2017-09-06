# AWESOME DOCUMENTATION AND TESTING FOR AN AMAZING API & SERVER
## REST API v1 OVERVIEW
> a simple RESTful API for a database with collections of your choosing.

- REST = REpresentational State Transfer
- A.P.I. = Application Programming Interface


1. Starting with the basic Food database example which Ben demonstrated in his [lecture](https://youtu.be/otSW2ZpBa2U).

## TESTING
> at least one test written for each route.  Write your tests BEFORE you write the actual routes.

1. mocha, chai sinon
  - set up for `npm run watch`
  - not sure if this will cause problems for future test scenarios where db needs to be persistent?
  ```js
  mongoose.models = {};
  mongoose.modelSchemas = {};
  ```

2. configure with jest?

> need to have tests for your routes and for your models.

## SCHEMA
> models should have some methods/statics that are tested.

## ROUTES
> routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.

### GET /food
- `curl http://localhost:8080/food`
- RESPONSE `STATUS 200 OK`
```json
[]
```

### PUT - example route and JSON data structure
### POST - example route and JSON data structure
  - ROUTE: `POST /something/to/:theDatabaseCollection`
  - PARAMETERS:
  - OPTIONAL PARAMETERS
  - EXAMPLE INPUT
  - REPONSE `STATUS 201 Created`


### DELETE - example route (authentication?) and JSON data structure
