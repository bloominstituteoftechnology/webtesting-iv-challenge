[Jump to the /food Route's HTTP Methods](#food)


<details><summary>CLICK THE TRIANGLE TO EXPAND NOTES SECTION</summary><p>



# AWESOME DOCUMENTATION AND TESTING FOR AN AMAZING C.R.U.D. API & SERVER
## REST API v1 OVERVIEW
> a simple RESTful API for a database with collections of your choosing.

## NOTES:

| ACRONYM | EXPANSION |
|:--- |:---:|
| **C.R.U.D.** | Create Read Update Destroy |
| **RE.S.T.** | REpresentational State Transfer |
| **A.P.I.** | Application Programming Interface |

1. Starting with the basic Food database example which Ben demonstrated in his [lecture](https://youtu.be/otSW2ZpBa2U).
2. Add a "reaction"

### TESTING
> at least one test written for each route. DONE √

> Write your tests BEFORE you write the actual routes. OKAY √

1. NOTE: mocha, chai sinon
  - Some adjustments per deprecation warnings.
  - set up for `npm run watch` and NYAN CAT!
  - not sure if this will cause problems for future test scenarios where db needs to be persistent?
  ```js
  mongoose.models = {};
  mongoose.modelSchemas = {};
  ```

  - also configured for mongoose vs. Promises.
  ```js
  mongoose.Promise = global.Promise;
  ```

2. TBD: configure with jest?

> need to have tests for your routes and for your models. - OKAY √

### SCHEMA
> models should have some methods/statics that are tested. - OKAY √

### ROUTES
> routes that use the following HTTP verbs: GET, PUT, POST, and DELETE. - OKAY √


</p></details>


***
# /food

## GET all database entries
- `curl http://localhost:8080/food`
- RESPONSE: `STATUS 200 OK` https://http.cat/200
- RETURN: `Array` of food items and reactions
- RETURN EXAMPLE:
```json
[
  {
    "_id":"59b073a6d33f9f7d3d49fb9f",
    "name":"Hot Dog",
    "__v":0,
    "reaction":"yum"
  },
  {
    "_id":"59b07931df08da801d606731",
    "name":"Pizza",
    "__v":0,
    "reaction":"yum"
  },
  {
    "_id":"59b0d4f15ae07fa6f1a46b8b",
    "name":"Brussel Sprouts",
    "__v":0,
    "reaction":"yum"
  }
]
```

## POST a new entry into the database
- `curl -X POST -H "Content-Type: application/json" -d '{"name":"Hot Dog"}' localhost:8080/food`
- PARAMETERS: {name: "food item"}

| NAME | TYPE | DESCRIPTION | UNIQUE | REQUIRED | DEFAULT |
|:---:|:---:|:---:|:---:|:---:|:---:|
| name | `String` | *kind of food* | **YES** | **YES** | none |

- OPTIONAL PARAMETERS: {reaction: "yum"}

| NAME | TYPE | DESCRIPTION | UNIQUE | REQUIRED | DEFAULT |
|:---:|:---:|:---:|:---:|:---:|:---:|
| reaction | `String` | *"yum"* or *"yuck"* | no | no | *"yum"* |

- EXAMPLE INPUT: {"name":"Brussel Sprouts",reaction:"yuck"}
- REPONSE: `STATUS 201 Created` https://http.cat/201
- RETURN: Input `Object`
- RETURN EXAMPLE:
```json
{
  "__v":0,
  "name":"ban chan",
  "_id":"59b0e12933377aad73c225cf",
  "reaction":"yum"
}
```

## PUT a modification into one database record
- `curl -X PUT -H "Content-Type: application/json" -d '{"name":"Brussel Sprouts","reaction":"yuck"}' localhost:8080/food/reaction`
- PARAMETERS: {name: "food item","reaction":"yuck"}

| NAME | TYPE | DESCRIPTION | UNIQUE | REQUIRED | DEFAULT |
|:---:|:---:|:---:|:---:|:---:|:---:|
| name | `String` | *kind of food* | **YES** | **YES** | none |
| reaction | `String` | *"yum"* or *"yuck"* | no | no | *"yum"* |


- ROUTE: **PUT /food**
- RESPONSE: `STATUS 200 OK` https://http.cat/200
- RETURN: Modified `Object` of food items and reactions
- RETURN EXAMPLE:
```json
{
  "_id":"59b0d4f15ae07fa6f1a46b8b",
  "name":"Brussel Sprouts",
  "__v":0,
  "reaction":"yuck"
}
```

## DELETE a database record
