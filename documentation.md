# Movie API Documentation

Here's how you can interface with our Movie API.

Port- Location of our endpoints to interface with our API is at http://localhost:3000

## [POST] /api/movie

| Endpoint  | Type | Data
| --------- | -----| ------
|/api/movie | POST | JSON 

### Example 
````
{
  name: 'Harry Potter',
  genre: 'Fantasy',
}

Adds a new movie to the Database

````
## [GET] /api/movies

| Endpoint  | Type | Data
| --------- | -----| ------
|/api/movies | GET | JSON 

### Example 
```
{
  name: 'Harry Potter',
  genre: 'Fantasy',
},
{
  name: 'Sta Wars',
  genre: 'Sci-Fi',
}

Will receive all of the movies in the database we have POSTed 
```
## [PUT] /api/movie

| Endpoint  | Type | Data
| --------- | -----| ------
|/api/movie | PUT | JSON 
### Example 
```
{
  name: 'Star Wars',
  genre: 'Sci-Fi,
}

Will update the previous 'Sta Wars' movie entry with 'Star Wars'
```
## [DELETE] /api/movie

| Endpoint  | Type | Data
| --------- | -----| ------
|/api/movie | DELETE | JSON 

### Example 
````
{
  name: 'Harry Potter',
  genre: 'Fantasy',
}

Will remove the Harry Potter JSON entry from the Database
