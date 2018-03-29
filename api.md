# Server Testing - Cars API Documentation
This API was created in order to help understand Server testing using ```Chai```, ```Chai-HTTP``` and ```Sinon```.

The API contains routes that use the following HTTP verbs: POST, GET, PUT and DELETE.

It will allow users to view a list of cars with their manufacturer and model name. Users will also be able to create new car entries to the database, edit a given car and delete a given car.

## Port - Location of all endpoints to interface with our API is at `http://localhost:3030`

## [POST] `/api/cars`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/cars     | POST | json |

### Example:
```
{
  manufacturer: 'Porsche',
  name: '911 GT3',
}
```

## [GET] `/api/cars`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/cars     | GET | json |

### Example:
```
[
  {
    name: 'Porsche',
    genre: '911 GT3',
  },
  {
    name: 'McLaren',
    genre: 'F1',
  }
]
```
## [PUT] `/api/cars`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/cars     | PUT | json |

### Example:
```
  {
    name: 'McLaren',
    genre: 'F1'
  }
```

## [DELETE] `/api/cars`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/cars     | DELETE | json |
