# Bands API

### Band Schema and Model

Each _Band_ document should conform to the following object structure:

<!-- ```js
{
    name: 'Radiohead',
    genre: 'Alternative Rock',
    album: {
      name: 'In Rainbows',
      releaseDate: '07 Oct 2007',
      favSong: 'Reckoner',
    },
  });
}
``` -->

```js
  {
    name: 'Radiohead',
    genre: 'Alternative Rock',
    album: 'In Rainbows'
    albumReleaseDate: '07 Oct 2007',
    albumHitSong: 'Reckoner',
  }
```

### CRUD Endpoints

| Method | Endpoint      | Description                                                |
| ------ | ------------- | ---------------------------------------------------------- |
| POST\* | api/bands     | Creates a new _Band_ object, sent w/in the `request body`. |
| GET    | api/bands     | Returns an array of all _Band_ objects in the database.    |
| GET    | api/bands/:id | Returns a _Band_ object in the database.                   |
| PUT    | api/bands/:id | Updates the _Band_ object, returns modified document.      |
| DELETE | api/bands/:id | Removes the _Band_ object, returns deleted _Band_ name.    |

`*` Properties _name_, _genre_ and _album_ are **required**
