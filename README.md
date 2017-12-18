# Server-Testing-Mini

## A follow along practice for teaching TDD

## The purpose of this guided demo is to get you to set up your environment for building out your CRUD API with Documentation, tests and of course, your endpoints.

---

## Step 1. Project Initialization

* Create an empty directory and name it whatever you'd like.
* Initialize your project with an `npm init` command (This will create a `package.json` file that you can run `npm` commands to in order to save your `node_modules`).
* The packages that we need for this project are:
  * express
  * body-parser
  * mongoose
  * mocha
  * chai-http
  * morgan --> this is new we'll chat about it.
  * sinon

## Step 2. Project Initialization Round II

* Create the following files in your project.

  * server.js
  * app.js
  * documentation.md
  * .gitignore
  * routes.test.js
  * models.test.js

## Step 3. Build a server, and a testing environment

* in your `package.json` file, under `scripts` add the test command:

```
"scripts": {
  "test": "mocha *.test.js"
},
```

* This command will allow you to run your tests.

* Next, head over to your `server.js` file that we created and build out the boilerplate code for your node server.
* Finally, we're going to set up our testing environment, head over to your `routes.test.js` file and require in `mongoose`, `chai`, and `chai-http`.
* You'll also pass `chaiHTTP` into your `chai` as `middlware`

```
chai.use(chaiHTTP);
```

* and of course, you'll want to pull in your server as it will be used to mock calls to your api. And call `mongoose.connect` to link up with a testing `mongo` instance.

```
mongoose.connect('mongodb://localhost/test');
```

* This should be all you need to get started on this project. This mini-project will actually be just the starter pack for your Server Testing Sprint.
