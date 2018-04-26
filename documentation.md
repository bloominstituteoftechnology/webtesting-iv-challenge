# Bands API

This API is for interfacing with Nick's favorite bands. This is an open sourced project.

## API Endpoints

* Here is a list of the endpoints that are available for use when using this API.
* Port is set to `http://localhost:5000`.

### [GET] 'api/bands'

| TYPE |    URL    |                  DATA |
| ---- | :-------: | --------------------: |
| GET  | api/bands | bandName*, bandGenre* |

### [POST] 'api/bands/create'

| TYPE |       URL        |                  DATA |
| ---- | :--------------: | --------------------: |
| POST | api/bands/create | bandName*, bandGenre* |

### [PUT] 'api/bands/:id'

| TYPE |      URL      |     DATA |
| ---- | :-----------: | -------: |
| PUT  | api/bands/:id | bandID\* |

### [DELETE] 'api/bands/delete/:id'

| TYPE   |         URL          |     DATA |
| ------ | :------------------: | -------: |
| DELETE | api/bands/delete/:id | bandID\* |

* All the fields marked with `*` are required when using the specified endpoint.
