# Bands API

This API is for storing and accessing a list of user entered bands along with extra relevant data for each band.

```js
{
  name: {
    type: String,  // Required
    required: true,
    unique: true,
    index: true,
  },
  genre: String,
  recentAlbum: String,
}
```

## API Endpoints

* The following is a list of endpoints avalaible for BandsAPI

| Type   |      URL       | DATA (req.body)                                      |
| :----- | :------------: | :--------------------------------------------------- |
| GET    |  /api/bands/   | N/A                                                  |
| POST   |  /api/bands/   | { name, genre, recentAlbum } all required properties |
| PUT    | /api/bands/:id | Only propertys to be changed need to be sent         |
| DELETE | /api/bands/:id | Provide \_id to delete from database                 |

## GET

A 'get' request to '/api/bands/' will return an array of all band objects on the darabase.

A 'get' request to '/api/bands/:id' will return an object with the id requested.

* If no band is found with that id, will return a 404 response and `{ error: 'That id does not exist.' }`

## POST

A 'post' to '/api/bands/' will add a new band object to the database. _ALL THREE_ properties are _REQUIRED_. Will return the new band object if added successfully.

## PUT

A 'put' to '/api/bands/:id' will update an existing band in the database. Only properties to be changed need to be sent to the server. Will return the entire updated band object.

* If no band is found with that id, will return a 404 response and `{ error: 'That id does not exist.' }`

## Delete

A 'delete' to '/api/bands/:id' will delete an existing band from the database. If successful, will return `{ status: 'success' }`.

* If no band is found with that id, will return a 404 response and `{ error: 'That id does not exist.' }`
