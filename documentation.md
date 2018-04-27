# Battlefield API

_This API is for creating,updating, rendering or deleting your battelfield status. This is an open sourced project._

## API Endpoints

_The following is a list of all the endpoints that you have available for use with our API._

## [GET] /api/battlefield

* Getting all of the battlesfield's users in our API.

## [PUT] /api/battlefield

* Updating a particular user to update their stats by their user ID.

## [POST] /api/battlefield

* Creating and saving a new user to our API.

* Example.

```
{
    name: agent007,
    kills: 275,
    deaths: 0
}
```

## [DELETE] /api/battlefield

* Find and delete a user in our API by their user ID.

---
| Type   |       URL        |            Info |
| ------ | :--------------: | --------------: |
| GET    | /api/battlefield |   Get all users |
| PUT    | /api/battlefield |   Update a user |
| POST   | /api/battlefield | Create and Save |
| DELETE | /api/battlefield:id |          Delete |