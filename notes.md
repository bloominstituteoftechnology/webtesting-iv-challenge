# Server Testing Using Jest

##Objectives
- intro today's project
- introduce the TDD/BDD workflow
        - TDD === test driven === write tests first to make sure a feature works

- configure jest's test environment to run in node mode
- introduce the supertest library
- use the cross-env module to configure the environment before running tests
- write integration tests that hit a test database

## Requirements
- when making a GET to the / endpoint the APT should respond with status code 200 and the following JSON object `{ api: running }`
- the user model should hash the password before saving it to the database

TDD === Test Driven Development `(red-green-refactor workflow)`
* no code is written unless a test requires it
* only write enough code to make the tests pass.
* once the test passes look for opportunities to clean up test and code.
* this can be utilized as a design tool. Write a test...then write code that will pass the test. 
* this way results in really clean code that satisfies requirements.


BDD === Behavior Driven Development (search for Dan North Video)


User Story Example
As a: `sales executive` (client)
I want: `login to the system` (do something)
So that: `I can see my sales for the day/quarter/whatever` (value - the **why**)

As a: `accounting officer` (client)
I want: `login to the system` (do something)
So that: `I can run the payroll` (value - the **why**)

Scenarios (this is where the tests result from)

Given: `a username`
    - and: `a password`
When: `the username is valid`
    - and: `the password is valid`
Then: `the system will allow login`
    -  and: `the user is redirected to the appropriate page`

Given: `a username`
    - and: `a password`
When: `the username is NOT valid`
    - and: `the password is valid`
Then: `the system will NOT allow login`
    - and: `the system will show a message to user`
    - and: `the user is redirected to their login page`

By default, Jest uses `jsdom`
For Node, we need to change that default in the `package.json`

```type:js

"jest" : {
    testEnvironment: "node"
},

```