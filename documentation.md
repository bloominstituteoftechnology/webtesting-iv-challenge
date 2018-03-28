# Record API Documentation

This documents the records API routes and responses.

All Routes are located at `localhost:3030/records`
## Routes
### [POST] `/records`

Creates a new record

**Required Parameters:**
| Parameter | Type | Description |
|---|---|---|
|`artistName`|`String`|`The Artist Name`|
| `name` | `string` | The Record Name |
| `recordType` | `string` | The Record Type (ex. LP, EP, 33) |

**Example Request Body:**
```javascript
req.body = {
  artistName: "The Beatles",
  name: "The White Album",
  type: "LP"
}
```
