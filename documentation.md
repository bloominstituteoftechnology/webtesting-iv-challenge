### Marvel Movies API

This API is for interfacing with all Marvel Cinematic Universe movies. This is an open source project. For contributing please reference [this contribution guide](www.dantemcu.com).

### How to use this API

Refer to the following endpoints for routes. The route create takes in a movie title and the year it was released. The route list lists the movies in descending order. The route put takes in an id and new movie title and year to update that movie. The route delete takes in an id and deletes the movie.

### API Endpoints

| TYPE   | URL                  | DATA                |
| ------ | -------------------- | ------------------- |
| POST   | /api/band/create     | movie*, year*       |
| GET    | /api/band/list       |                     |
| PUT    | /api/band/update/:id | id*, movie*, year\* |
| DELETE | /api/band/delete/:id | id\*                |
