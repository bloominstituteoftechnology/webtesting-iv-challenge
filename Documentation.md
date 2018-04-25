# Bands API <button name="button" onclick="http://localhost:5000/">See it in the browser!</button>

> This API provides a list of our favorite bands along with their genres and touring status. This is an open source API.

<br>

## API Endpoints

<br>

> Below are all of the available endpoints for this API:

<br>

| Type     |      Endpoint       | Description                                                                                                                              |
| -------- | :-----------------: | :--------------------------------------------------------------------------------------------------------------------------------------- |
| [POST]   | `/api/bands/create` | Creates a new band in the database. Request body requires band name, genre, and tour status. Should give newly created band in response. |
| [DELETE] |  `/api/delete/:id`  | Deletes a band from the database. Requires one parameter, the id. Should give message "Deleted successfully!" in response.               |
| [PUT]    |   `/api/edit/:id`   | Edits an existing band in the database. Requires one parameter, the id. Should give edited band in response.                             |
| [GET]    |    `/api/bands`     | Provides a list of all bands in the database. Should give an array of band objects in response.                                          |

<br>

## Band Schema

<br>

<br>

```
const BandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: String,
    required: true
  },
  tourstatus: {
    type: String,
    required: true
  }
});
```

## Referencing Issues and Pull Requests

<br>

*   Coming Soon

<br>

## License

<br>

*   Look at our LICENSE.md for more information. We used the standard MIT license for this project.

<br>

## Contributors

<br>

*   [Megan Williamson](https://www.github.com/gooseandmegander)
*   [Johnathan Huggett](https://www.github.com/JohnathanHuggett)
