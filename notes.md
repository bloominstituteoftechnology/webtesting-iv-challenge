Scenarios

given: a new user
when: username and password are present
and: username is a string
and: password is a string
and: password has a minimum length of 8 characters
then: a new user should be created and saved
and: should show password is hashed
and: should return a status code of 201 (created)

    when: username or password are not present
    then: a new user should not be created and not be saved
        and: should return a status code of 400 (bad request)
        and: should return an error message "please include a username and password"
