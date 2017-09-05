# AWESOME DOCUMENTATION AND TESTING FOR AN AMAZING SERVER
## REST API v1 OVERVIEW
> a simple RESTful API for a database with collections of your choosing.

- Starting with the basic Food database example which Ben demonstrated in his [lecture](https://youtu.be/otSW2ZpBa2U).

## ROUTES
> routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.

1. GET - example route
  - ROUTE `GET /something/from/:theDatabaseCollection`
  - RESPONSE `STATUS 200 OK`
  ```json
  {
    "Key1": "Value",
    "Key2": "Value",
    "KeyObject1": {
      "Key": "Value",
      "Key": "Value",
      "Key": "Value"
    },
    "KeyObject2": {
      "Key": "Value",
      "Key": "Value",
      "Key": "Value"
    },
    "KeyArray": [
      {
      "Key": "Value",
      "Key": "Value",
      "Key": "Value"
      }
    ]
  }
  ```

2. PUT - example route and JSON data structure
3. POST - example route and JSON data structure
  - ROUTE: `POST /something/to/:theDatabaseCollection`
  - PARAMETERS:
  - OPTIONAL PARAMETERS
  - EXAMPLE INPUT
  - REPONSE STATUS 201 Created


4. DELETE - example route (authentication?) and JSON data structure

## Awesome
> at least one test written for each route.  Write your tests BEFORE you write the actual routes.

## Fantastic
> models should have some methods/statics that are tested.

> need to have tests for your routes and for your models.
