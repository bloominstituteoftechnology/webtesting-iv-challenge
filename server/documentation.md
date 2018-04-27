# Bands API

This is a note taking API. This is an open sourced project. For contributing please reference [this contribution guide](https://github.com/emukupa).

* The .gitignore includes the node_modules, data. You might want to include in the api folder.

## APE EndPoints

* The following is a list of all of the endpoints that you available for use with out API.

### [GET] `api/users`

### [GET] `api/ users/:id`

### [GET] `api/ users/:id/notes`

### [GET] `api/ users/:id/friends`

### [POST] `api/users`

### [POST] `api/users/:id/notes`

### [POST] `api/users/:id/friends`

### [PUT] `api/users:id`

### [PUT] `api/users/:id/notes:id`

### [PUT] `api/users/:id/friends:id`

### [DELETE] `api/users:id`

### [DELETE] `api/users/:id/notes:id`

### [DELETE] `api/users/:id/friends:id`

| Description               | URL                        | DATA                                         | type   |
| ------------------------- | -------------------------- | -------------------------------------------- | ------ |
| Get all users             | /api/users                 | returns an array of users                    | GET    |
| Get a single user by id   | /api/users:id              | returns a user with \*id                     | GET    |
| Get a user's notes        | /api/notes                 | returns a list of the users notes            | GET    |
| Get a user's note by id   | /api/notes:id              | returns a user's note with \*id              | GET    |
| Get a user's friends      | /api/friends               | returns a list of the users friends          | GET    |
| Get a user's friend by id | /api/friends:id            | returns a user's friend with \*id            | GET    |
| Create a user             | /api/users                 | requires a \*username and \*password         | POST   |
| Create a note             | /api/users/:id/notes       | requires a \*title and \*text, can have tags | POST   |
| add a friend              | /api/users/:id/friends     | requires a user and friend to have an \*id   | POST   |
| update a user             | /api/users/:id             | requires a user's \*id                       | PUT    |
| update a note             | /api/users/:id/notes/:id   | requires a note \*id                         | PUT    |
| update a friend           | /api/users/:id/friends/:id | requires a user and friend to have an \*id   | PUT    |
| delete a user             | /api/users/:id             | requires a user's \*id                       | DELETE |
| delete a note             | /api/users/:id/notes/:id   | requires a note \*id                         | DELETE |
| delete a friend           | /api/users/:id/friends/:id | requires a user and friend to have an \*id   | DELETE |

* _all fields marked with `*` are required_
