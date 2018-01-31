# Users API
This api's permits acess to a database of Users and perform the following functions to the data Register a new User, login with a User's Credentials, Display a list of Users, Update a User's information, and Delete a User.

# To start the database
1. Ensure MongoDB is installed in your system
    * mongod should be acessible from your %path
        * follow this tutorial if you have questions: https://www.youtube.com/watch?v=KLdHHa2XS8M
2. Run this command from the root directory:
    * npm run dbstart
    * if all executed well it will have an instance of mongodb running on that terminal.

# Api Endpoints
#### All api calls should be directed to:
```http://localhost:5000/api```
#### Use the following Endpoints:
| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:|
|/register|Post|Json|Returns the user's id
#### Registration Object Example:
```JSON
{
    "email":"test2@test2.com",
    "password":"asdf",
    "aboutme": "I do funny stuff to code"
}
```

| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:| 
|/login|Post|Json|Returns the logged in user|
#### Log-In Object Example:
```JSON
{
    "email":"test2@test2.com",
    "password":"asdf"

}
```


| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:| 
|/update/:id|Put|Json|Returns the updated user|
#### Update Object Example:
```JSON
{
    "aboutme": "I do great stuff to code"
}
```

| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:| 
|/delete/:id|delete|Json|Returns {msg: user has been deleted!}|
#### Delete Object Example:
```JSON
{
    "email":"test2@test2.com",
    "password":"asdf"
}
```

| Endpoint | Type | Data | Result |
|:---------|:--:|:--:|:-:|
|/users|Get|Json|Returns a list of users|

