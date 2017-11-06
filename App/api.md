# Super Mario 64 Mod API
### Created by Collin Ferguson



## Purpose
This API is used to organize a Mongo database of Super Mario 64 Mods that is easy to add to and access as necessary.
# Mod Schema
### The Mongo Mod Schema has the most necessary details of a Super Mario 64 Mod
* ### `title`
    * Must be included and must be unique
    * *`String`*
* ### `creator`
    * Required as well
    * *`String`*
* ### `description`
    * *`String`*
* ### `uniqueLevels`
    * Required. Signifies whether or not a mod plays differently
    * *`Boolean`*
* ### `difficulty`
    * Set the mods difficulty to `0` through `10`. Choose 0 if `uniqueLevels` is false. `5` is difficulty of Super Mario 64
    * *`Number`*
* ### `reviews`
    * `userRating`
        * reviews can be from rated from `0` to `5`
    * `text`
        * *`String`*
* ### `Mod.methods.getAvgRating()`
    * `result`
        * calculates average rating of a Mod's comments
    * `returns`
        * *`Number`*

# Routes
## [GET] `<URL>/mods`
Will return all SM64 mods in the database
## [GET] `<URL>/mods/:id`
Will return a single mod using its ```_id```
## [POST] `<URL>/mods`
Accepts a JSON object and returns JSON Mod after success
#### *Note: title, creator, and uniqueLevels are required*
### Example:
```
[POST]

{
    "title": "Super Portal 64",
    "creator": "Kaze",
    "description": "Use a portal gun in the normal game",
    "uniqueLevels": false,
    "difficulty": 0,
}
```
## [PUT] `<URL>/mods/:id` 
Adds a new comment.
Accepts a JSON object and returns JSON Mod after success
#### *Note: userRating and text are required*
### Example:
```
[PUT]

{
    "text": "Luigi wasn't in the game so I deleted it. Creative mod though",
    "userRating": 1,
}
```
## [DELETE] `<URL>/mods/:id`
Deletes a mod using the mods `_id`