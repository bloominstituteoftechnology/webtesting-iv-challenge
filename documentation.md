
# Users API

This documentation is for interfacing with the Countries API. 

### Port/Location to interface with all Countries API. 
`http://localhost:3000/api`


### Running the Project

* Run npm install
* Install dependecies such as express, mongo, etc.
* Run mongo 



### The following are required: 

* A test for each endpoint


### [POST]

Use this to create a country entry

|Endpoint       | Type      | Data    |
|---------------|:---------:|--------:|
|/api/countries | post      | json    |


Example of entry:

```
{
    "name": "USA",
    "continent": "North America",
    "capital": Washington D.C."
}
```


## [GET]

Use this to get all country entries

|Endpoint       | Type      | Data    |
|---------------|:---------:|--------:|
|/api/countries | post      | json    |


## [PUT]

Use this to get entry based on country id

|Endpoint       | Type      | Data    |
|---------------|:---------:|--------:|
|/api/countries/:id| post      | json    |




## [DELETE]

Use this to delete based on country id

|Endpoint       | Type      | Data    |
|---------------|:---------:|--------:|
|/api/countries/:id | post      | json    |



