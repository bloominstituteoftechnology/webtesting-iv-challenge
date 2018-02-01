 TODO LIST
==========
###### :scroll: *A TEST DRIVEN DEVELOPMENT API* :clipboard:




This api will allow you to unit test server endpoint  methods using chai, mocha, and sinon modules.  It uses a basic Node RESTful API.
You can test CRUD operations on a Todo List.
## :heavy_check_mark: <b>You will need to have:</b>
####  *Node.js*
<ul>
    <li>it is assumed you have a basic understanding of node.js as it is an essential part of this api.</li>
</ul>

#### *POSTMAN*
<ul>
    <li>a very powerful API debugger for making fast HTTP requests.</li>
    <li>all postman requests must be sent in json format. See the example below. All fields are required except where noted.</li>
</ul>
<pre><code>
    {
        "todo": "something todo",
        "completed": "true/false"
        "user": "name of person who made this todo",
        "createdAt": "date of listing", (not required/automatically generated)
    }
    </pre></code>


#### *MongoDB*
<ul>
    <li>the database that our express server will be connecting to.</li>
</ul>

##  :wrench:Configuration
<ul>
    <li>make sure dependencies are installed by running <i>npm install</i> from the terminal within the main directory.</li>
    <li>make sure you have MongoDB running before starting the test server, it may also help to have MongoDB compass installed so you can monitor MongoDB's connectivity and changes.</li>
    <li>in a separate terminal window run <i>npm start</i> to begin the test server</li>
    <li>direct all requests through POSTMAN on localhost:3000.  All endpoints and allowed requests will be discussed in the next section.</li>
</ul>

##  :airplane:  Endpoints
This API allows you to perform POST, PUT, GET, and DELETE requests.


| ENDPOINT          | TYPE   | DATA | ACTION                                   |
|-------------------|--------|------|------------------------------------------|
| /api/todo     | GET    | json | displays list of all todos from the database |
| /api/todo     | POST   | json | creates a new todo         |
| /api/todo/:id | GET    | json | gets a single todo<br>              |
| /api/todo:id | PUT    | json | updates a single todo                |
| /api/todo/:id | DELETE | json | deletes a single todo                 |





