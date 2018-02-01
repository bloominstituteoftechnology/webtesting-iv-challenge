# API Documentation

## [POST] `/person`
Description: Creates a new person with a first name and a last name.

__Request Body Parameters__:
|  Field  | Type | Description
|---------|------|---|
|firstName|String|First name of the person to save.|
|lastName |String|Last name of the person to save. |

__Request example__:
```
{
  firstName: 'Jesse',
  lastName:  'Hood'
}
```

__Success 201 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|true (the person was saved)|

__Response example__:
```
{ 
  success: true
}
```

__Error 400 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false (the person was not saved)|
|message  |String | A message describing an input error.|

__Response example__:
```
{ 
  success: false,
  message: 'firstName is a required field.'
}
```
__Error 500 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false|
|message  |String | A message describing an internal server error.|

__Response example__:
```
{ 
  success: false,
  message: 'An unexpected error occurred.'
}
```

## [GET] `/person`
Description: Fetches an array of people that exist in the database.

__Request Body Parameters__: N/A

__Success 200 Response__:
|  Field  | Type | Description
|---------|-------------|---|
|success  |Boolean      |true (the person was saved)|
|people   |Array<Person>|An array of all people that were found.|


__Response example__:
```
{ 
  success: true,
  people: [{
    firstName: 'Jesse',
    lastName:  'Hood',
  }, {
    firstName: 'Patrick',
    lastName:  'Sandoval'
  }]
}
```

__Error 404 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false (no people exist)|
|message  |String |No people exist in the database.|

__Response example__:
```
{ 
  success: false,
  message: 'No people exist in the database.'
}
```

__Error 500 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false|
|message  |String |A message describing an internal server error. |

__Response example__:
```
{ 
  success: false,
  message: 'An unexpected error occurred.'
}
```

## [GET] `/person/:id`
Description: Fetches a person by ID if the person exists.

__Request Body Parameters__:
|  Field  | Type | Description
|---------|------|---|
|id       |String|ID of the person to find.|

__Success 200 Response__:
|  Field  | Type  | Description
|---------|-------|---|
|success  |Boolean|true (the person was found)|
|person   |Person |the person that was found.|


__Response example__:
```
{ 
  success: true,
  person:{
    firstName: 'Jesse',
    lastName:  'Hood',
  }
}
```

__Error 404 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false (person does not exist)|
|message  |String |Person does not exist in the database.|

__Response example__:
```
{ 
  success: false,
  message: 'Person does not exist in the database.'
}
```

__Error 500 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false|
|message  |String |A message describing an internal server error. |

__Response example__:
```
{ 
  success: false,
  message: 'An unexpected error occurred.'
}
```
## [PUT] `/person/:id`
Description: Updates a person by ID and request body.

__Request Body Parameters__:
|  Field  | Type | Description
|---------|------|---|
|firstName|String|First name of the person to update.|
|lastName |String|Last name of the person to update. |

__Request example__:
```
{
  firstName: 'Pat',
  lastName:  'Sandoval'
}
```


__Success 200 Response__:
|  Field  | Type  | Description
|---------|-------|---|
|success  |Boolean|true (the person was updated.)|
|person   |Person |The updated person.|

__Response example__:
```
{ 
  success: true,
  person: {
    firstName: 'Pat',
    lastName: 'Sandoval'
  }
}
```

__Error 404 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false (person does not exist)|
|message  |String |Person does not exist in the database.|

__Response example__:
```
{ 
  success: false,
  message: 'Person does not exist in the database.'
}
```

__Error 500 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false|
|message  |String |A message describing an internal server error. |

__Response example__:
```
{ 
  success: false,
  message: 'An unexpected error occurred.'
}
```

## [DELETE] `/person/:id`
Description: Deletes a person by ID if the person exists.

__Request Body Parameters__: N/A

__Success 200 Response__:
|  Field  | Type  | Description
|---------|-------|---|
|success  |Boolean|true (the person was deleted.)          |

__Response example__:
```
{ 
  success: true
}
```

__Error 404 Response__:
|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false (person does not exist)|
|message  |String |Person does not exist in the database.|

__Response example__:
```
{ 
  success: false,
  message: 'Person does not exist in the database.'
}
```

__Error 500 Response__:

|  Field  | Type | Description
|---------|-------|---|
|success  |Boolean|false|
|message  |String |A message describing an internal server error. |

__Response example__:
```
{ 
  success: false,
  message: 'An unexpected error occurred.'
}
```
