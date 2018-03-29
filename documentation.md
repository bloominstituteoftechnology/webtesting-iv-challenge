# Users API Documentation
Here's the description of the User API! 

## Port - Location of all endpoints to interface with our API is at `http://localhost:3030`

## [POST] `/api/user`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/user     | POST | json |

### Example:
```
{
  name: 'Donald Trump',
  gender: 'Female',
  age: 99,
}
```

## [GET] `/api/user`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/user     | GET | json |

### Example:
```
[
  {
    name: 'German',
    gender: 'male',
    age: 23,
  },
  {
    name: 'Viky',
    gender: 'female',
    age: 24
  }
]
```