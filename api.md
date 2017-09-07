# AWESOME DOCUMENTATION AND TESTING FOR AN AMAZING C.R.U.D. API & SERVER
## REST API v1 OVERVIEW
> a simple RESTful API for a database with collections of your choosing.

- C.R.U.D. = Create Read Update Destroy
- RE.S.T.  = REpresentational State Transfer
- A.P.I.   = Application Programming Interface


1. Starting with the basic Food database example which Ben demonstrated in his [lecture](https://youtu.be/otSW2ZpBa2U).

## TESTING
> at least one test written for each route.

> Write your tests BEFORE you write the actual routes.

1. mocha, chai sinon
  - set up for `npm run watch`
  - not sure if this will cause problems for future test scenarios where db needs to be persistent?
  ```js
  mongoose.models = {};
  mongoose.modelSchemas = {};
  ```
  - also configured for mongoose vs. Promises
  ```js
  mongoose.Promise = global.Promise;
  ```

2. configure with jest?

> need to have tests for your routes and for your models.

## SCHEMA
> models should have some methods/statics that are tested.

## ROUTES
> routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.

***
# /food

### GET - example route and returned data structure
- `curl http://localhost:8080/food`
- RESPONSE `STATUS 200 OK` https://http.cat/200
- RETURNs an Array of foods
```js
[
  {
    "_id":"59b073a6d33f9f7d3d49fb9f",
    "name":"Hot Dog",
    "__v":0
  },
  {
    "_id":"59b07931df08da801d606731",
    "name":"Pizza",
    "__v":0}
]
```

### PUT - example route and JSON data structure
### POST /food
  - `curl -X POST -H "Content-Type: application/json" -d '{"name":"Hot Dog"}' localhost:8080/food`
  - ROUTE: `POST /something/to/:theDatabaseCollection`
  - PARAMETERS: {name: "food item"}
  - OPTIONAL PARAMETERS: none
  - EXAMPLE INPUT: {"name":"Hot Dog"}
  - REPONSE `STATUS 201 Created` https://http.cat/201


### DELETE - example route (authentication?) and JSON data structure
