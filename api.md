## Documentation for Marsupials API ##
  The Marsupials API will allow users to view a list marsupials, with their name, latin name, and regional habitat.   Users can also post new maruspials to the database, login to edit a given marsupial, and delete marsupials that might not belong on the list.

### The Port for the Marsupials API: http://localhost:3000

### HTTP Requests for the API ###
* POST - Creates a new Marsupial for the Database
* GET - Retrives a list of all Marsupials in the Database.
* GET by ID - Retrieves a Marsupial by a given id.
* PUT - Allows the user to edit a Marsupial by supplied id
* DELETE - Allows users to delete a Marsupial from the list

### [POST] ###

| Endpoint | Type | Data |
|----|----|----|
| /api/marsupials/ | post | json |

#### POST Input Example ###

``` 
{
    name: Wombat,
    latinName: Vombatus ursinus,
    region: Southeastern Australia
} 
```
### [GET] ###

| Endpoint | Type | Data |
|----|----|----|
| /api/marsupials/ | get | json |

### [GET] ###

| Endpoint | Type | Data |
|----|----|----|
| /api/marsupials/:id | get | json |

### [PUT] ###

| Endpoint | Type | Data |
|----|----|----|
| /api/marsupials/:id | put | json |

#### PUT Input Example ###

``` 
{
    name: Wombat,
    latinName: Vombatus ursinus,
    region: Southeastern Australia
} 
```
### [DELETE] ###

| Endpoint | Type | Data |
|----|----|----|
| /api/marsupials/ | DELETE | json |



