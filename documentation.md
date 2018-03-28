# Example API Documentation
Here's the description of our glorious API! *NOTE:* interfacing with our API will bring you much joy and happiness!

## Port - Location of all endpoints to interface with our API is at `http://localhost:3000`

## [GET] `/api/list`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/bands     | GET | json |

### Example:
```
[
  {
    name: 'John Smith',
    occupation: 'Author',
  },
  {
    name: 'Olivia Walters',
    occupation: 'Nurse',
  }
]
```


## [POST] `/api/list`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /api/band     | POST | json |

### Example:
```
{
  name: 'Rush',
  occupation: 'Author',
}
```

TBC