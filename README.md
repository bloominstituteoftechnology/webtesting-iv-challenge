# Documentation for Server-Testing Sprint

This api is for any starwars lover!

### `[GET]` '/character-info/:id'

| Command | Description                                      | Return Type |
| ------- | ------------------------------------------------ | ----------- |
| `GET`   | 'Returns character name and hair color'          | Object      |

### `[POST]` '/character/'

| Command | Description                                      | Return Type |
| ------- | ------------------------------------------------ | ----------- |
| `POST`  | 'Creates a new character in the Database'        | Object      |

### `[PUT]` '/change-character-haircolor'

| Command  | Description                                     | Return Type |
| -------- | ----------------------------------------------- | ----------- |
| `UPDATE` | 'Update a characters hair color'                | Object      |

### `[DELETE]` '/character/:name'

| Command  | Description                                     | Return Type |
| -------- | ----------------------------------------------- | ----------- |
| `DELETE` | 'Deletes a character from our Database by ID #' | Object      |