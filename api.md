## API Documentation ##
Here is the documentation for the API. It will provide information for interfacing with the API. This API has information for climbing areas and the type of climbing that is most popular there.

### Port/Location for all endpoints to interface with the HEX API :  http://localhost:3000

### Allowed HTTPs requests: ###
+ POST - to create a resource
+ PUT - to update a resource
+ GET - to get a resource or list of resources
+ DELETE - to delete a resource

### [POST] /api/climbs/add
| Endpoint | Type | Data |
|----|----|----|
| /api/climbs/ | post | json |

*Example:*
+ Fields are required

``` 
{
    climbingArea: 'Red Rocks',
    zipCode: 89148,
    climbingType: 'trad'
} 
```

### [PUT] /api/climbs/update
| Endpoint | Type | Data |
|----|----|----|
| /api/climbs/zipCode | put | json |

*Example:*
+ Fields are required

``` 
{
    climbingArea: 'Red Rocks',
    zipCode: 89148,
    climbingType: 'sport'
} 
```

### [GET] /api/climbs/all
| Endpoint | Type | Data |
|----|----|----|
| /api/climbs/ | get | json |

*Example:*
+ No input is required, will return all current data

+ Success Response: 
    + Code: 200
    + Content: ``` { climbingArea: 'Red Rocks', zipCode: 89148, climbingType: 'sport' }, { climbingArea: 'Mt. Erie', zipCode: 62446, climbingType: 'trad' } ``` 

+ Error Response: 
    + Code: 404 NOT FOUND
    + Content: ``` { error: 'Record not found' } ```
+ OR
    + Code: 401 UNAUTHORIZED
    + Content: ``` { error: 'You are not authorized to make this request' } ```

+ Sample Call:
``` Sample call will go here ```

### [GET] /api/climbs/specific
| Endpoint | Type | Data |
|----|----|----|
| /api/climbs/zipCode | get | json |

*Example:*
+ Zip Code is required, will return record with Zip Code that matches what is entere

+ Success Response: provided Zip code  62446 
    + Code: 200
    + Content: ``` { climbingArea: 'Mt. Erie', zipCode: 62446, climbingType: 'trad' } ``` 

+ Error Response: 
    + Code: 404 NOT FOUND
    + Content: ``` { error: 'Record not found' } ```
+ OR
    + Code: 401 UNAUTHORIZED
    + Content: ``` { error: 'You are not authorized to make this request' } ```

+ Sample Call:
``` Sample call will go here ```

### [DELETE] /api/climbs/delete
| Endpoint | Type | Data |
|----|----|----|
| /api/climbs/zipCode | put | json |

*Example:*
+ Providing zipCode as input is required, will delete instance with zipCode that matches what is entered

+ Success Response: 
    + Code: 200
    + Content: ``` { message: 'Record successfully removed' } ``` 

+ Error Response: 
    + Code: 404 NOT FOUND
    + Content: ``` { error: 'Record not found' } ```
+ OR
    + Code: 401 UNAUTHORIZED
    + Content: ``` { error: 'You are not authorized to make this request' } ```