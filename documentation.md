#Server-Testing Assignment - Jobs

## Port - Location of all endpoints to interface with our API is at `http://localhost:3000`

## [GET] `/jobs`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /jobs     | GET | json |

### Example:
```
[
  {
    name: 'John Smith',
    occupation: 'Author',
  },
  {
    name: 'Joyce Corley',
    occupation: 'Nurse',
  }
]
```


## [POST] `/jobs`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /jobs    | POST | json |

### Example:
```
{
  name: 'John Smith',
  occupation: 'Author',
}
```


## [PUT] `/jobs/:id`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /jobs/:id   | PUT | json |

### Example:
```
{
  name: 'Matthew Smith',
  occupation: 'Author',
}
 ```

 Matthew Smith changes occupations to...

 ```
{
  name: 'Matthew Smith',
  occupation: 'Software Engineer', //Switches here.
}
```


## [DELETE] `/jobs/:id`
| Endpoint      | Type          | Data  |
| ------------- |:-------------:| -----:|
| /jobs/:id    | DELETE | json |

### Example:
```
{
  name: 'Matthew Smith',
  occupation: 'Software Engineer',
}
```
Matthew Smith gets deleted

```

null

```