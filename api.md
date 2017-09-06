# API Guide
------------
## [GET] All Teams Stored in the database
`GET http://localhost:3000/api/allteams`

## Response
`Returns an array containing all the teams in the database`
```javascript
[
  {
    _id: 212354352354315
    name: 'LA Lakers'
  },
  {
    _id: 212354352354315
    name: 'LA Clippers'
  },
  {
    _id: 212354352354315
    name: 'GS Warriors'
  }
]
```

## [POST] Add a new team to the collection
`POST http://localhost:3000/api/addteam`

## Parameters
| Name | Type | Description |
|------|------|-------------|
|name  |string| **required.** The name of the team to add.|

## Example input
```javascript
{
  name: 'Houston Rockets'
}
```

## Response
`Returns the team that was added to the database`
```javascript
{
  __v: 0,
  _id: 156849785296348,
  name: 'Houston Rockets'
}
```

## [Delete] Removes a team from the database
`[DELETE] http://localhost:3000/api/removeteam`

## Parameters
| Name | Type | Description |
|------|------|-------------|
|name  |string| **required.** The name of the team to be removed|

## Example input
```javascript
{
  name: 'Oakland Raiders'
}
```
## Response
`returns the removed team`
```javascript
{
  __v: 0,
  _id: 963587463289671,
  name: 'Oakland Raiders'
}
```

## [PUT] Updates the name of a given team
`[PUT] http://localhost:3000/api/editteam`

## Parameters
| Name | Type | Description |
|------|------|-------------|
|oldName| string| **required.** The name of the team to be updated|
|name  |string| **required.** The new name given to the team|

## Example input
```javascript
{
  oldName: 'GB Packers',
  name: 'NE Patriots'
}
```
## Response
`returns the updated team`
```javascript
{
  __v: 0,
  _id: 569873786214598,
  name: 'NE Patriots'
}
```
