# Bands API

This API is for storing and accessing a list of user entered bands along with extra relevant data for each band.

## API Endpoints

```js
{
  name: String,  // Required
  genre: String,
  recentAlbum: String,
}
```

* The following is a list of endpoints avalaible for BandsAPI

| Type   |      URL       | DATA                                                       |
| :----- | :------------: | :--------------------------------------------------------- |
| GET    |  /api/bands/   | N/A                                                        |
| POST   |  /api/bands/   | Structure Below                                            |
| PUT    | /api/bands/:id | Object with \_id property required along with updated data |
| DELETE | /api/bands/:id | Provide \_id to delete from database                       |

## GET

A 'get' request to '/api/bands/' will return an array of all band objects on the darabase.
A 'get' request to '/api/bands/:id' will return an object with the id requested.

* If no band is found with that id, will receive a 404 response and `{ error: 'That id does not exist.' }`

## POST

A 'post' to '/api/bands/' will add a new band object to the database. _ALL THREE_ properties are _REQUIRED_
