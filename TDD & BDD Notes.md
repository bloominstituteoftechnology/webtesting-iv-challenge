## TDD & BDD

**TDD** = Test Driven Development

- Write tests first, then write the code to fullfill the tests
- No code is written unless a test requires it
- Only write enough code to make the tests pass


**BDD** = Behavior Driven Developemnt (Mike North video)

#### User Story Example

As a: sales executive
I want: login to the system
So That:  I can see my sales for the day / quarter

**Scenarios:**

**Given:** an username
    - and: a password
**When:** the username is valid
    - and: the password is valid
**Then:** the system will allow login
    - and: the user is redirectde to their landing page

**Given:** an username
    - and: a password
**When:** the username is valid
    - and: the password is invalid
**Then:** the system will NOT allow login
    - and: the system will show a message to the user
    - and: the user is redirectde to the login page

As a: payroll officer
I want: login to the system
so that: I can run the payroll

Given: an username
    - and: a password
When: the username is valid
    - and: the password is valid
Then: the system will allow login
    - and: the user is redirectde to their landing page