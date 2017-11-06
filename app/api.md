# Video Game API

## Get all games
 
`GET /games`

### Response
Returns an array of all of the games.
```
[
  {
     "_id": "59fa6654caa4c912e8035e15",
    "title": "Witcher 3",
    "developer": "CD Projekt Red",
    "yearReleased": 2015,
     "__v": 0
  },
  {
    "_id": "59fb45bc94247c33a80bb508",
    "title": "Portal 2",
    "developer": "Valve",
    "yearReleased": 2012,
    "__v": 0
  }
]
```

## Get an individual game
 
`GET /games/:id`

### Response
Returns the game with the specified ID.
```
{
  "_id": "59fa6654caa4c912e8035e15",
  "title": "Witcher 3",
  "developer": "CD Projekt Red",
  "yearReleased": 2015,
  "__v": 0
}
```

## Create a game
 
`Post /games`

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `title` | `String` | **Required.** The title of the game |
| `developer` | `String` | **Required.** The developer of the game |
| `yearReleased` | `Number` | **Required.** The year the game was released |


### Request
Send an object with the required fields.

```
{
  "title" : "Portal 2",
  "developer" : "Valve",
  "yearReleased" : 2012
}
```
### Response
Returns the game object that was successfully created.
```
{
  "__v": 0,
  "title": "Portal 2",
  "developer": "Valve",
  "yearReleased": 2012,
  "_id": "59fb45bc94247c33a80bb508"
}
```

## Update a game
 
`Put /games/:id`

### Request
Send an object that includes the fields to be updated.

```
{
  "title": "Portal",
  "developer": "Valve",
  "yearReleased": 2007
}
```
### Response
Returns the game object that was successfully updated.

```
{
  "_id": "59fa6d52832bd72820b1b3f2",
  "title": "Portal",
  "developer": "Valve",
  "yearReleased": 2007,
  "__v": 0
}
```

## Delete a game
 
`Delete /games/:id`

### Response
Returns the game object that was successfully deleted.
```
{
  "_id": "59fa6d52832bd72820b1b3f2",
  "title": "Portal",
  "developer": "Valve",
  "yearReleased": 2007,
  "__v": 0
}
```
