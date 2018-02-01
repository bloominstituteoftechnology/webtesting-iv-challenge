# API Documentation

This is a the user api. It's going to provide you with basic access to CRUD functions in our database.

## Assignment:

* Create an API using TDD
* Documentation

## Requirements:

* Your API must have routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.
* You must have documentation for each route. Write your documentation in a file called `api.md`.
* You must have at least one test written for each route. Write your tests BEFORE you write the actual routes.
* Your models should have some methods/statics that are tested.
* You will need to have tests for your routes and for your models.

---

**All API access is over HTTPS, and data is sent and received as JSON.**

# User

## [POST] - Create a new user

`POST /api/user/create`

**Parameters:**

|    Field    |   Type   |                Description                 |
| :---------: | :------: | :----------------------------------------: |
| `userEmail` | `String` | **Required.** The new users email address. |
| `password`  | `String` |   **Required.** The new users password.    |
| `firstName` | `String` |         The new users first name.          |
| `lastName`  | `String` |          The new users last name.          |

**Example:**

```
{
  "userEmail": "bill@gates.com",
  "password": "win954life",
  "firstName": "William",
  "lastName": "Gates"
}
```

## [GET] - Returns a list of all users

`GET /api/user/all`

**Example Return**

```
{
  "userEmail": "bill@gates.com",
  "password": hashedpassword,
  "firstName": "William",
  "lastName": "Gates"
},
{
  "userEmail": "melinda@gates.com",
  "password": hashedpassword,
  "firstName": "Melinda",
  "lastName": "Gates"
}
```

## [PUT] - Updates a users information

`PUT /api/user/update`

|    Field    |   Type   |              Description               |
| :---------: | :------: | :------------------------------------: |
| `userEmail` | `String` | **Required.** The users email address. |
| `password`  | `String` |   **Required.** The users password.    |
| `firstName` | `String` |         The users first name.          |
| `lastName`  | `String` |          The users last name.          |

> Example:

```
{
  "userEmail": "bill@gates.com",
  "password": "win954life",
  "firstName": "William",
  "lastName": "Gates"
}
```

## [DELETE] - Deletes a user

`Delete /api/user/delete`

|    Field    |   Type   |              Description               |
| :---------: | :------: | :------------------------------------: |
| `userEmail` | `String` | **Required.** The users email address. |
| `password`  | `String` |   **Required.** The users password.    |

> Example:

```
{
  "userEmail": "bill@gates.com",
  "password": "win954life",
}
```
