# MTG Meta Crusher API

Want to get the edge on your playgroup? Love analyzing data to improve your decks and lines?

MTG Meta Crusher allows you to create a group, add decks and pilot profiles, and then visualize the data.

## API Endpoints

* The following is a list of all of the endpoints that are available for use with our API.

### `api/metas`

| TYPE | DATA                 | DESCRIPTION                              |
| ---- | -------------------- | ---------------------------------------- |
| GET  |                      | View a list of all metas in the database |
| POST | metaName, password\* | Create a new meta [password optional]    |

* passwords are an optional parameter provided by the meta creator to require verification when performing any non-GET operations on their meta

### `api/meta/{metaName}`

| TYPE   | DATA       | DESCRIPTION                           |
| ------ | ---------- | ------------------------------------- |
| GET    |            | View all data about the selected meta |
| PUT    | password\* | Update an existing meta               |
| DELETE | password\* | Delete an existing meta               |

* passwords are only required if the meta is setup to be password protected

### `api/meta/{metaName}/decks`

| TYPE | DATA                 | DESCRIPTION                                   |
| ---- | -------------------- | --------------------------------------------- |
| GET  |                      | View a list of all decks in the selected meta |
| POST | metaName, password\* | Create a new deck in the selected meta        |

* passwords are only required if the meta is setup to be password protected

### `api/meta/{metaName}/decks/{deck}`

| TYPE   | DATA                 | DESCRIPTION                              |
| ------ | -------------------- | ---------------------------------------- |
| GET    |                      | View a list of all metas in the database |
| PUT    | metaName, password\* | Update data on an existing deck          |
| DELETE | metaName, password\* | Delete data on an existing deck          |

* passwords are only required if the meta is setup to be password protected

### `api/meta/{metaName}/pilots`

| TYPE | DATA                 | DESCRIPTION                                           |
| ---- | -------------------- | ----------------------------------------------------- |
| GET  |                      | View a visual list of all pilots in the selected meta |
| POST | metaName, password\* | Create a new pilot profile in the selected meta       |

* passwords are only required if the meta is setup to be password protected

### `api/meta/{metaName}/pilots/{pilot}`

| TYPE   | DATA                 | DESCRIPTION                              |
| ------ | -------------------- | ---------------------------------------- |
| GET    |                      | View a list of all metas in the database |
| PUT    | metaName, password\* | Update data on an existing pilot profile |
| DELETE | metaName, password\* | Delete data on an existing pilot profile |

* passwords are only required if the meta is setup to be password protected
