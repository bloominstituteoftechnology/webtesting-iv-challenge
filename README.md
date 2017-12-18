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

Your API must have routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.  
You must have documentation for each route.  Write your documentation in a file called `api.md`.  
You must have at least one test written for each route.  Write your tests BEFORE you write the actual routes.  
Your models should have some methods/statics that are tested.  
You will need to have tests for your routes and for your models.  



# Documentation for Server-Testing Sprint

This api is for any starwars lover!

### `[GET]` '/character-info/:id'

| Command | Description                             | Return Type |
| ------- | --------------------------------------- | ----------- |
| `GET`   | 'Returns character name and hair color' | Object      |

### `[POST]` '/character/'

| Command | Description                               | Return Type |
| ------- | ----------------------------------------- | ----------- |
| `POST`  | 'Creates a new character in the Database' | Object      |

### `[PUT]` '/change-character-haircolor'

| Command  | Description                      | Return Type |
| -------- | -------------------------------- | ----------- |
| `UPDATE` | 'Update a characters hair color' | Object      |

### `[DELETE]` '/character/:name'

| Command  | Description                                     | Return Type |
| -------- | ----------------------------------------------- | ----------- |
| `DELETE` | 'Deletes a character from our Database by ID #' | Object      |
