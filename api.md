# Sports Player API


### Get all Players

`[GET] /players`

returns
```
{
	"firstName" : "Sean",
	"lastName" : "Taylor",
	"position" : "safety",
	"team" : "Miami Hurricanes",
	"age" : 31
},
{
	"firstName" : "Corey",
	"lastName" : "Coleman",
	"position" : "wide receiver",
	"team" : "Baylor Bears",
	"age" : 23
},
...
```



### Create a Player

`[POST] /players`

##### Parameters

| *Name*        | *Type*           | *Description*  |
| ------------- |:-------------:| :-----:|
| `firstName`      | `string` | `Required:` First name of player |
| `lastName`     | `string` | `Required:`Last name of player |
| `position` | `string` | Position of player |
| `team` | `string` | Current team of player |
| `age` | `int`      | Age of player |

###### Example input (payload)

```
{
	"firstName" : "Sean",
	"lastName" : "Taylor",
	"position" : "safety",
	"team" : "Miami Hurricanes",
	"age" : 31
}
```

returns
```
{
	"success" : true
},
```



### Update a Player

`[PUT] /players/:playerId`

##### Description

Pass along unique playerId in the query url.

Pass payload with fields to update.

##### Parameters

| *Name*        | *Type*           | *Description*  |
| ------------- |:-------------:| :----- |
| `firstName`      | `string` | `optional:` First name of player |
| `lastName`     | `string` | `optional:` Last name of player |
| `position` | `string` | `optional:` Position of player |
| `team` | `string` | `optional:` Current team of player |
| `age` | `int` | `optional:` Age of player |

###### Example input (payload)

```
{
	"team" : "Minnesota Gophers",
}
```

returns
```
{
	"success" : true
},
```



### Delete a Player

`[DELETE] /players/:playerId`

##### Description

Pass along the unique playerId in the query url.
