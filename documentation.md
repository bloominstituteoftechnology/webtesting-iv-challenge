# API Documentation
## Anime!

```
[GET] /anime
```
### Description
This path will obtain a list of all anime in the database.
### Parameters
N/A, a simple `GET` request is all that is needed.
### Example Response
```
status: 200 OK
----------------
{
  "body": [
    {
      "id": "fo90ef8h209ufgh0e90f9",
      "title": "One Piece",
      "genre": "Action/Adventure?"
    }
  ]
}
```
----

```
[POST] /anime
```
### Description
This endpoint allows new anime to be added into the database.
### Input
|Name|Type|Description|
|----|----|-----------|
|title|string|The title of the anime you want to add to the database.|
|genre|string|The genre of the anime you want to add to the database.|

### Example Response
```
status: 200 OK
----------------
{
  "id": "fj248rh2049t8he09if209e8rh029",
  "title": "Akira",
  "genre": "A confusing but cool looking mess."
}
```
----

```
[DELETE]
```
### Description
Temp
### Parameters
### Example Response
```
Response
```
----

```
[PUT]
```
### Description
Temp
### Parameters
### Example Response
```
Response
```
