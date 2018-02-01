USERS API
===

This is an API, where you can create, update, delete and read data about the user.

## Get a list of all users

| Method | Endpoint      |
| ------ | ------------- |
| GET    | `/api/users/` |



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


---
## Delete a user

| Method | Endpoint         |
| ------ | ---------------- |
| DELETE | `/api/users/:id` |

*Note*: `:id` must be replaced with the **id** of the user, you wish to delete.