# __Server Testing Documentation__

For this project, we created an API using a test driven development approach. With this project, we built a dummy MONGODB API in order to structure sample tests for GET, PUT, POST, and DELETE (CRUD) requests.

## Dependencies utilized in this project

* sinon
* chai
* mocha
* chai-http
* express
* morgan
* mongoose

### PORT LOCATION: http://localhost:3333

## Instructions:
* fork and clone repository from https://github.com/brcampbell001/Server-Testing
* run `npm install` to bring in all of the dependencies
* make sure that your `MongoDB` is running
* run `npm start` to start up your server
* to run tests utilize `npm test`

# Endpoints /users 
| Endpoint | Type | Input (req.body) | Response |
| :---: | :---: | :---: | :---:|
| /users | *__POST__* | ```{name: 'Clara', location: 'America'}``` | ```{name: 'Clara', location: 'America'}``` | 
| /users | *__GET__* | ```Not applicable``` | ```[{name: 'Clara', location: 'America'}]``` |
| /users | *__PUT__* | ```{name: 'Clara', location: 'Venus'}``` | ```{name: 'Clara', location: 'Venus'}``` | 
| /users | *__DELETE__* | ```{name: 'Clara'}``` | ```success: true``` |


#### __Maintained by:__

##### [bitcoinTroy the Mentor](https://github.com/bitcointroy)

##### [Grumpy Clara](https://github.com/clarakosi)

##### [Benjammin the Epitomy of Awesome and Clara Ego Deflator](https://github.com/brcampbell001)