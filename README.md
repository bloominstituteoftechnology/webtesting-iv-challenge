# Server-Testing-Mini

## A follow along practice for teaching TDD

## The purpose of this guided demo is to get you to set up your environment for building out your CRUD API with Documentation, tests and of course, your endpoints.

---

# Rate the Sodas
## Api Documentation 
This API allows your to add and compare your favourite sodas and their ratings.

## Port - Location for all endpoints to interface with our Sodas App is 
`http://localhost:3333`

## [POST] `/api/sodas/ceate`
|Endpoint   |Type   |data  |
| --------- | ----- | ---- |
|/api/sodas/|post   |json  |  


## [GET] `/api/sodas`
|Endpoint   |Type   |data  |
| --------- | ----- | ---- |
|/api/sodas/|get    |      | 

#### Example

* To post a soda pass data in form of a json object with rating as a number and name as a string.
```
{
  "name":"coke",
  "rating":9
}
```
* To get names of all sodas in the database simply send a request to `/api/sodas`
