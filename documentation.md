# Bands API

This is an api for interfacing with a bunch of bands that have nothing to do with Ryan or anyone. This is a closed source project so if you want to contribute, too bad. [Here's]() a cat video though.

* You should have stopped reading already...

## API Endpoints

* following is a list of endpoints

### [POST] band/create

| TYPE | URL       | DATA                  |
| ---- | --------- | --------------------- |
| POST | /band/add | bandName*, bandGenre* |

### [GET] /bands

| TYPE | URL       | DATA     |
| ---- | --------- | -------- |
| GET  | /bands    |          |
| GET  | /band/:id | bandId\* |

### [DELETE] /band/:id

| TYPE   | URL           | DATA     |
| ------ | ------------- | -------- |
| DELETE | /api/band/:id | bandId\* |

### [PUT] /band/:id

| TYPE | URL       | DATA                            |
| ---- | --------- | ------------------------------- |
| PUT  | /band/:id | bandId*, bandName*, bandGenre\* |
