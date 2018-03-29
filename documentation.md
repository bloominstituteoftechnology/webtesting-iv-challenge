# API Documentation
Here's the description of our Sports Team API.

## Port - Location of all endpoints to interface with our API is at `http://localhost:3030`

## [POST] `/teams`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /teams     | POST | json |

### Example:
```
{
  name: 'Giants',
  sport: 'Football',
}
```

## [GET] `/teams`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /teams     | GET | json |

### Example:
```
[
  {
    name: 'Giants',
    sport: 'Football',
  },
  {
    name: 'Lions',
    sport: 'Football',
  }
]
```

## [PUT] `/teams/:id`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /teams/:id     | PUT | json |

### Example:
```
{
  name: 'Giants',
  sport: 'Football',
}
```
now returns
```
{
  name: 'Giants',
  sport: 'Still Football',
}
```

## [DELETE] `/teams/:id`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /teams/:id     | DELETE | json |

### Example:
```
[
  {
    name: 'Giants',
    sport: 'Football',
  },
  {
    name: 'Lions',
    sport: 'Football',
  }
]
```
  now returns
```
[
  {
    name: 'Lions',
    sport: 'Football',
  }
]
```