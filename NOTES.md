# Setting Up File

npm init -y
touch .gitignore
echo "node_modules" >> .gitignore
yarn add express
yarn add jest --dev
Change package JSON
  "scripts": {
    "test": "jest --watch --verbose"
}
"jest": {
		"testEnvironment": "node"
	},
yarn test
yarn add nodemon -D
Change package JSON
  "scripts": {
    "start": "nodemon"
}
yarn start
add index.js file
add __tests__ folder
add files to test to __tests__, e.g., index.spec.js


# Server Testing

## Somponents of an API

function name(args) => return something
- routes/endpoints: url(data) => return response;
- business logic (validate/data conversion/operations);
- data acess: talk to the persistent data store;

set the test environment to run on 'node' instead of a browser