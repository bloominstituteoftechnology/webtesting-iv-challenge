# API Documentation

How to handle GET/POST/PUT/DELETE

### Port - Location of all endpoints to interface with our API is at `http://localhost:3000`

## [Get] `/api/bands`

| EndPoint  | Type | Data |
| ---------- | :--: | ---: |
| /api/bands | Get  | json |

### Example:

```
{
    name: 'Rush',
    genre: 'Classic Rock'
}
{
    name: 'Linkin Park',
    genre: 'Alternative'
}
```

## [POST] `/api/band`

| EndPoint | Type | Data |
| --------- | :--: | ---: |
| /api/band | Post | json |

### Example:

```
{
    name: 'Rush'
    genre: 'Classic Rock'
}
```

## [PUT] `/api/bands/:name`

| EndPoint  | Type | Data |
| ---------- | :--: | ---: |
| /api/band:name | PUT  | json |

### Example:

```
{
    name: 'Rush',
}
```

## [DELETE] `/api/band/:name`

| EndPoint  | Type | Data |
| ---------- | :--: | ---: |
| /api/band:name | DELETE  | json |

### Example:

```
{
    name: 'Rush',
}
```
