# Documentation for Server-Testing API

If you're looking for basic server testing this sprint is fantastic for you. The following will elaborate to interface with the server testing API.

## PATH `/foo`

| Command | Description | Return Type |
| :--- | :--- | :--- |
| [GET] | Returns 'bar' | String |

## PATH `/users`

| Command | Description | Return Type |
| :--- | :--- | :--- |
| [GET] | Returns a list all of user objects | Array of Objects |
| [POST] | Adds a new User to the mongo database. Requires username and password. [See note #1][1] | User Object |

### PATH `/users/:id`

[See note #2][1]

| Command | Description | Return Type |
| :--- | :--- | :--- |
| [PUT] | Edits a user with the given `:id`. Requires id and username or password. [See note #3][1] | JSON success message |
| [DELETE] | Deletes the user with a given `:id`. | JSON success message |

* * *

## Notes

1. If no username or password is provided the Mongo database will reject the entry.
1. If no `:id` is provided in url the query will be rejected.
1. If a username or password is not provided the query will be rejected.

[1]: #notes "Server-testing-mini notes"