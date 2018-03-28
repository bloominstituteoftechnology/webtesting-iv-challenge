# Server-Testing

## Topics

* TDD
* `sinon`
* `chai`
* `mocha`
* `chai-http`
* `done()`
* statics vs methods
* documentation

## Project

For this project you will be creating an API using a test driven development approach as well as writing documentation.  As an example of good documentation you can reference GitHub's API docs: https://developer.github.com/v3/git/commits/

For this project you will be building a simple restful API for a database with collections of your choosing.

## Requirements

1. Your API must have routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.
2. You must have documentation for each route.  Write your documentation in a file called `documentation.md`.
3. You must have at least one test written for each route.  Write your tests BEFORE you write the actual routes.
4. Your models should have some methods/statics that are tested.
5. You will need to have tests for your routes and for your models.

# Our API Documentation
Here's the description of our glorious API! *NOTE:* interfacing with our API will bring you much joy and happiness!
## Port - Location of all endpoints to interface with our API is at `http://localhost:3030`
## [POST] `/api/weapons`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/weapons     | POST | json |
### Example:
```
{
  name: 'Knife',
  description: 'Stabs the flesh',
}
```
## [GET] `/api/weapons`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/weapons     | GET | json |
### Example:
```
[
  {
    name: 'Knife',
    description: 'Stabs the flesh',
  },
  {
    name: 'Pencil',
    description: 'Pokes the flesh',
  }
]
```
## [PUT] `/api/weapons/:name`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/weapons/:name     | PUT | json |
### Example:
All PUT requests require a name and description input.
```
[
  {
    name: 'New name',
    description: 'New description',
  }
]
```
## [DELETE] `/api/weapons/:name`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/weapons/:name     | DELETE | json |