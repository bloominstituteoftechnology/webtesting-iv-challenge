# Book API

Book
------

Represents book details.

### Book attributes:

* id `(String)`: Unique Identifier
* title `(String)`: Book Title
* author `(String)`: Author Name
* year `(Number)`: Publication Year
* isbn `(String)`: ISBN
* pages `(Number)`: Number of Pages
* genre `(Array(String))`: List of Genres

## Book Collection

### Get All Books

`GET /api/books`

### Response

```
Status: 200

[
  {
    "_id": "12345",
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "year": 1979,
    "isbn": "0-330-25864-8",
    "pages": 180,
    "genre": ["Science Fiction", "Comedy"]
  },
  {
    "_id": "12346",
    "title": "Garden's of the Moon",
    "author": "Steven Erikson",
    "year": 1999,
    "isbn": "0-553-81217-3",
    "pages": 712,
    "genre": ["Fantasy", "Military"]
  },
  ...
]
```

### Create a Book

`POST /api/books`

### Request

Body

```
{
  "title": Deadhouse Gates",
  "author": "Steven Erikson",
  "year": 2000,
  "isbn": "0-553-81311-0",
  "pages": 943,
  "genre": ["Fantasy", "Military"]
}
```

### Response

```
Status: 200

{
  "id": "12345"
  "title": "Deadhouse Gates",
  "author": "Steven Erikson",
  "year": 2000,
  "isbn": "0-553-81311-0",
  "pages": 943,
  "genre": ["Fantasy", "Military"]
}
```

## Book

A single a Book object

### Get a Single Book

`GET /api/books/:id`

### Parameters

| id | String | A hexadecimal string ID of the book to get |
| --- | --- | --- |

### Response

```
Status: 200

{
  "id": "12345"
  "title": "Deadhouse Gates",
  "author": "Steven Erikson",
  "year": 2000,
  "isbn": "0-553-81311-0",
  "pages": 943,
  "genre": ["Fantasy", "Military"]
}
```

```
Status: 404

{
  "error": "Book not found"
}
```

### Update a Book

`PUT /api/books/:id`

### Parameters

| id | String | A hexadecimal string ID of the book to get |
| --- | --- | --- |

### Request
Body

```
{
  "title": "The Grapes of Wrath",
  "author": "John Steinbeck",
  "year": 1939
}
```

### Response
Returns the updated entry

```
Status: 200

{
  "id": "12345"
  "title": "The Grapes of Wrath",
  "author": "John Steinbeck",
  "year": 1939,
  "isbn": "0143039431",
  "pages": 464,
  "genre": ["Historical Fiction", "Realism"]
}
```
```
Status: 404

{
  "error": "Book not found"
}
```

### Delete a Book

`DELETE /api/books/:id`

### Parameters

| id | String | A hexadecimal string ID of the book to get |
| --- | --- | --- |

### Response

```
Status: 200
{
  "success": "Deletion successful"
}
```

```
Status: 404
{
  "error": "Book not found"
}
```