# Band API Documentation
Handler Documentation for Bands API
#### by Cody Wendekenecht and Glenn-David Daniel

### Handlers 
| Name | EndPoint  | HTTP Verb | Data | Description |
| :-- | :-- | :--- |  :--- | :--- |
| getBandName |  /api/bands | GET | JSON | Returns the expected band name
| getAllBands |  /api/bands | GET | JSON | Returns all the names of all bands
| ???GET [Band Name] |  /api/bands | GET | JSON | Returns band with name provided
| ???POST |  /api/bands | POST | JSON | Will add a new band
| getBandByName |  /api /band/:id | GET | JSON | Returns all bands
| getBandGenre |  /api /band/[Band Name] | GET | JSON | Returns genre of target band name
| findByIdAndUpdate |  /api /band/:id | PUT | JSON | Updates the band matching the target :id
| getBandByName |  /api /band/:id | PUT | JSON |  Will  not update the band at an incorrect :id
| findByIdAndRemove |  /api /band/:id | DELETE | JSON |  Will  delete the band at :id


### EXPECTED TEST RESULTS
| Name | EndPoint  | HTTP Verb | Data | Description |
| :-- | :-- | :--- |  :--- | :--- |
| getBandName |  /api/bands | GET | JSON | Returns the expected band name
| getAllBands |  /api/bands | GET | JSON | Returns all the names of all bands
| getBandByName |  /api/bands | GET | JSON | Returns band with name provided
| ??? |  /api/bands | POST | JSON | Will  add a new band
| ??? |  /api/bands | POST | JSON | Will  not post an incomplete band
| getBandByName |  /api /band/:id | GET | JSON | Returns band matching target :id
| findByIdAndUpdate |  /api /band/:id | PUT | JSON | Updates the band matching target :id
| findByIdAndRemove |  /api /band/:id | DELETE | JSON |  Will  delete the band matching target :id
| findByIdAndRemove |  /api /band/:id | DELETE | JSON |  Will  not delete a band with an incorrect :id