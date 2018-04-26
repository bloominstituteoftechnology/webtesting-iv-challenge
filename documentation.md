# Band - API Docs

### For Server-Testing Project

This API is for interfacing with the Top 100 Billboard musicians and bands. This is an open sourced project. For contributing please reference [this contribution guide](www.google.com).

* A special note on how to work with this API.

## API Endpoints

* The following is a list of all the endpoints available for use with this API.

### [GET] `/bands`

Returns an array of Band objects in the database.

### [POST] `/bands`

Creates a new Band object in the database.

### [PUT] `/bands/:id`

Updates a Band object.

### [DELETE] `/bands/:id`

Removes a Band object from the database.

| TYPE   | URL        | DATA                 |
| ------ | ---------- | -------------------- |
| GET    | /bands     |                      |
| POST   | /bands     | name*, genre*        |
| PUT    | /bands/:id | \_id*,name*, genre\* |
| DELETE | /bands/:id | \_id\*               |

* all fields marked with `*` are required
