# API Documentation


# Index: 
Description
Setup
GET
POST
UPDATE
DELETE

# Description:
This is an API that describe the animals by their region, type and name.

# Setup
 npm install
 run mongod
 nodemon server.js

POST:('/create-animal')
Add animal name, types, region found.

GET:('/list-animal')
Return list of animals.

PUT:('/change-region')
Modify the region of animals found.

DELETE:('/remove-animal')
Remove the animal from the database. 

# Running tests:
  Test to fail first.
  Run npm test.