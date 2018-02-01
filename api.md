# Overview
This describes the resources that make up the **Movie** REST API v1.
# Schema
All API access is over HTTP, and accessed from the `http://localhost/5000`. All data is send and received as JSON.
## Show all the users
Return a collection of users

| URL | `/api/users` |
|:---:|:---:|
| Method | `[GET]` |
| URL Params | None |
| Data Params | None |
| Success Response| Status code: `200`<br>Content: [{ id: 1, fName: "Henry", lName: "Ford", email: "123@123.com" },<br> { id: 2, fName: "Henry", lName: "Ford", email: "123@123.com" }] |
| Error Response | Status code: `500`<br>Content: { error: "No users found" } |

Sample Call:
```
axios.get('/api/users')
  .then(users => {
    console.log(users);
  });
```

## Show single user
Return a single user

| URL | `/api/users/:id` |
|:---:|:---:|
| Method | `[GET]` |
| URL Params<br>(Required) | `id=[Mongo ObjectID]` |
| Data Params | None |
| Success Response| Status code: `200`<br>Content: { id: 1, fName: "Henry", lName: "Ford", email: "123@123.com" } |
| Error Response | Status code: `500`<br>Content: { error: "No user found" } |

Sample Call:
```
axios.get('/api/users/1')
  .then(user => {
    console.log(user);
  });
```

## Create a user
Create a user if not existing

| URL | `/api/users` |
|:---:|:---:|
| Method | `[POST]` |
| URL Params | None |
| Data Params | `{ fName: [string], lName: [string], email: [string] }` |
| Success Response| Status code: `201`<br>Content: { success: "User created",<br> { lName: "Tom", fName: "Steve", email: "123@123.com" } } |
| Error Response | Status code: `400 BAD REQUEST`<br>Content: { error: "fName is required" } |

Sample Call:
```
axios.post('/api/users', { fName: "Jerry", lName: "John", email: "123@123.com" })
  .then(response => {
    console.log(response);
  });
```

## Update the user
Update the user and return the updated resource

| URL | `/api/users/:id` |
|:---:|:---:|
| Method | `[PUT]` |
| URL Params<br>(Required) | `id=[Mongo ObjectID]` |
| Data Params | { fName: [string], lName: [string], email: [string] } |
| Success Response| Status code: `200`<br>Content: { success: "User updated",<br> { lName: "Tom", fName: "Steve", email: "123@123.com" } } |
| Error Response | Status code: `404`<br>Content: { error: "User not found" } |

Sample Call:
```
axios.put('/api/users/1', { fName: "Jerry", lName: "John", email: "123@123.com" })
  .then(response => {
    console.log(response);
  });
```

## Delete the user
Find the user and delete it

| URL | `/api/users/:id` |
|:---:|:---:|
| Method | `[DELETe]` |
| URL Params<br>(Required) | `id=[Mongo ObjectID]` |
| Data Params | None |
| Success Response| Status code: `200`<br>Content: { success: "User deleted" } |
| Error Response | Status code: `404`<br>Content: { error: "User not found" } |

Sample Call:
```
axios.delete('/api/users/1')
  .then(response => {
    console.log(response);
  });
```
