## Documentation for Recipe API

This is an API to track user's recipes. The user will be able to add the recipe to the server with a POST, GET a specific recipe by name, modify a recipe with a PUT, and DELETE a recipe they no longer want.

### 1: POST

```
POST localhost:5001/recipes
```
Recipe posts will conform to the following schema:

| **Name**          | **Type**     |      **Description**    |
| -----             | -----        | -----                   |
| ```title```       | ```String``` | *Required* The title of the recipe |
| ```text```        | ```String``` | *Require* The body text of the recipe. |
| ```rating```      | ```Number``` | *Require* A 1-5 star rating for the recipe. |
|

##### Example post:

```
{
  "title": "Mock Duck Tacos",
  "text": "Korean BBQ Mock Duck(mock duck, gochuchang, tomato paste, rice wine vinegar, soy, sugar, sesame oil, scallions), flour tortillas, pickled onions, pickled cucumbers, cilantro", 
  "rating": 5
}

```
#### Testing

Testing is in place to ensure the following:
  * The post matches follows the correct schema
  * The post does not return an error.

### 2: GET

```
GET localhost:5001/recipes/:title
```
GET will return the full recipe object in the following format:
```
{
  "title": "Mock Duck Tacos",
  "text": "Korean BBQ Mock Duck(mock duck, gochuchang, tomato paste, rice wine vinegar, soy, sugar, sesame oil, scallions), flour tortillas, pickled onions, pickled cucumbers, cilantro", 
  "rating": 5
}

```
#### Testing

Tests are in place to ensure that:
  * The returned username matches the requested recipe.

### 3: PUT

```
PUT localhost:5001/recipes/:title
```
PUT will correctly update the recipe per user's input.

##### Example before PUT:
```
{
  "title": "Mock Duck Tacos",
  "text": "Korean BBQ Mock Duck(mock duck, gochuchang, tomato paste, rice wine vinegar, soy, sugar, sesame oil, scallions), flour tortillas, pickled onions, pickled cucumbers, cilantro", 
  "rating": 5
}

```
##### Example after PUT:
```
{
  "title": "Mock Duck Tacos",
  "text": "Korean BBQ Mock Duck(mock duck, gochuchang, tomato paste, rice wine vinegar, soy, sugar, sesame oil, scallions), flour tortillas, pickled onions, pickled cucumbers, cilantro, jalapeno peppers", 
  "rating": 3
}

```
#### Testing

Tests are in place to ensure that:
  * The post after a PUT differs from the post before the PUT.

### 4: DELETE

```
DELETE localhost:5001/recipes/:title
```
DELETE will remove the selected recipe.
#### Testing

Tests are in place to ensure that:
  * The recipe no longer exists after the DELETE call.






