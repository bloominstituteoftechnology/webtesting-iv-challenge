# Server-Testing-Mini

## A follow along practice for teaching Test Driven Development (TDD)

#### The purpose of this guided demo is to get you to set up your environment for building out your CRUD API with documentation, tests and of course, your endpoints.

---

## Step 1. Project Initialization

* Initialize your project with the `yarn init` command (This will create a `package.json` file).
* You can then run `yarn add` commands to in order to save your `node_modules`.
* The packages that we need for this project are:
  * express
  * body-parser
  * mongoose
  * mocha
  * chai
  * chai-http
  * morgan --> this is new, we'll chat about it.
  * sinon

## Step 2. Project Setup

* Create the following files in your project.
  * server.js
  * app.js
  * documentation.md
  * .gitignore
  * routes.test.js
  * models.test.js

## Step 3. Build A Server

* In your `package.json` file, under `scripts` add the test command:

  ```json
  "scripts": {
    "test": "mocha *.test.js"
  },
  ```

* This command will allow you to run your tests. If you would like, you can add `"start": "nodemon app.js"` to the `scripts`. Keep in mind that whichever file you point the "start" script to is where you'll invoke the Express _listen()_ method (your "entry point").
* Next, head over to the `server.js` file that you created, and build out the boilerplate code for your Node server.

## Step 4. Build A Testing Environment

* Now we're going to set up our testing environment. Head over to your `routes.test.js` file, and require `mongoose`, `chai`, and `chai-http`.
* Also, pass `chaiHTTP` into your `chai` as `middlware`.

  ```js
  chai.use(chaiHTTP);
  ```

* And of course, you'll want to require your server as it will be used to mock calls to your api.
* Finally, call `mongoose.connect` to link up with a testing `mongo` instance.

  ```js
  mongoose.connect('mongodb://localhost/test');
  ```

---

* This should be all you need to get started on this project!
* This mini-project will actually be the starter pack for the [Server-Testing](https://github.com/LambdaSchool/Server-Testing) lab.
