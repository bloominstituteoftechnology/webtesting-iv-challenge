# API Documentation 
 ## API must have routes that use the following HTTP verbs: GET, PUT, POST, and DELETE.
 ## Port - Location of all endpoints to interface with our API is at http://localhost:3030

### [POST] /api/band 
  
   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/band | POST | json |

```
    {
        name: 'Rush',
        genre: 'Classic Rock'
    }
```

### [GET] /api/bands

   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/band | GET | json |

``` 
  [
    {
      name: 'Rush',
      genre: 'Classic Rock'
    },
    {
      name: 'Linkin Park',
      genre: 'Alt Rock'
    }
  ]
```

### [PUT] /api/bands/123, where `123` is the id of the band that you want to modify.
#### * For this end point to work you need to have id added to URL and atleast one field to update on the Band object.
   
   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/band | PUT | json |

#### * Example:
```
    {
        name: 'Rush-more',
        genre: 'Classic Rock'
    }
```

### [DELETE] /api/bands/123, where `123` is the id of the band that you want to remove.
#### * For this end point to work you need to have id in the request URL.

#### * If your delete worked, you'll get a success object back.
   

   | Endpoint | Type | Data |
   |:---------------:|:----------:|:---------:|
   | /api/band | DELETE | json |

#### Example:
```
output: 
    {
        "Band removed": {
            name: 'Rush-more',
            genre: 'Classic Rock',
            id: 123
        }
    }