USERS API
===

This is an API, where you can create, update, delete and read data about the user.

## Get a list of all users

| Method | Endpoint      |
| ------ | ------------- |
| GET    | `/api/users/` |

#### Response Body
```json
{
    "success": true,
    "response": [{
        "_id": "5a7347064211c93929bdba99",
        "name": "John Doe",
        "email": "john@doe.com",
        "__v": 0
    }]
}
```

<br />
<br />

---
## Create a new user

| Method | Endpoint      |
| ------ | ------------- |
| POST   | `/api/users/` |

#### Request Body
A create request accepts a JSON with the properties listed below.

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| name       | String | yes      |
| email      | String | yes      |

#### Response Body
```json
{
    "success": true,
    "response": {
        "_id": "5a7347064211c93929bdba99",
        "name": "John Doe",
        "email": "john@doe.com",
        "__v": 0
    }
}
```
<br />
<br />

---
## Update a user

| Method | Endpoint         |
| ------ | ---------------- |
| PUT    | `/api/users/:id` |

*Note*: `:id` must be replaced with the **id** of the user, you wish to update.

#### Request Body
An update request accepts a JSON with the properties listed below.

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| name       | String | optional |
| email      | String | optional |

#### Response Body
```json
{
    "success": true,
    "response": {
        "_id": "5a7347064211c93929bdba99",
        "name": "John Doe",
        "email": "john@doe.com",
        "__v": 0
    }
}
```
<br />
<br />

---
## Delete a user

| Method | Endpoint         |
| ------ | ---------------- |
| DELETE | `/api/users/:id` |

*Note*: `:id` must be replaced with the **id** of the user, you wish to delete.

#### Response Body
```json
{
    "success": true,
    "response": null
}
```
<br />
<br />
