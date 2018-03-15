# API Documentation

Documentation for all the apis, which include `/ama`, `/...`.

### All endpoints: `http://localhost:3333`

### All API endpoints: `http://localhost:3333/api`

## `/ama`

All `/ama` API endpoints

| endpoint           | type   | description                                    |
| ------------------ | ------ | ---------------------------------------------- |
| `/ama/question`    | POST   | Creates an AMA and saves it to the database.   |
| `/ama`             | GET    | Requests all AMAs                              |
| `/ama/id`          | GET    | Requests a single AMA with `id`                |
| `/ama/question/id` | UPDATE | Updates the question field of an AMA with `id` |
| `/ama/answer/id`   | UPDATE | Updates the answer field of an AMA with `id`   |
| `/ama/question/id` | DELETE | Deletes the AMA with `id`                      |

---

### [POST] `/api/ama/question`

Creates an ama and saves it to the database.

#### Example:

Request: `[POST] /api/ama/question`

```
{
  question: 'What is Lambda School all about?'
}
```

Response: status `201`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What is Lambda School all about?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### Notes

1. Questions in the database must be unique (no duplicate questions).
1. Answers do not have to be unique.

---

### [GET] `/api/ama`

Get all amas.

#### Example:

Request: `[GET] /api/ama`

Response: status `200`

```
[
  {
    id: 1234567890abcdefghijklmnopqrstuvwxyz,
    question: 'What is Lambda School all about?',
    answered: false,
    createdOn: 'YYYY-MM-DDT00:00:00.000Z',
    __v: 0
  },
  {
    id: zyxwvutsrqponmlkjihgfedcba0987654321,
    question: 'What differentiates Lambda School from other CS programs?',
    answered: true,
    answer: 'You don't pay a cent until you get a job!'
    createdOn: 'YYYY-MM-DDT00:00:00.000Z',
    __v: 0
  }
]
```

#### Notes

1. When there are no amas in the database:

Request: `[GET] /api/ama`

Response: status `200`

```
{
    "message": "No amas in database.",
    "amas": []
}
```

---

### [GET] `/api/ama/id`

Get a specific ama.

#### Examples:

##### _Unanswered ama_

Request: `[GET] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

Response: status `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What is Lambda School all about?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

##### _Answered ama_

Request: `[GET] /api/ama/zyxwvutsrqponmlkjihgfedcba0987654321`

Response: status `200`

```
{
  id: zyxwvutsrqponmlkjihgfedcba0987654321,
  question: 'What differentiates Lambda School from other CS programs?',
  answered: true,
  answer: 'You don't pay a cent until you get a job!'
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### Notes

1. When there ama with id does not exist:

Request: `[GET] /api/ama/ayxwvutsrqponmlkjihgfedcba0987654321`

```
incorrect id (starts with a) - ayxwvutsrqponmlkjihgfedcba0987654321
correct id   (starts with z) - zyxwvutsrqponmlkjihgfedcba0987654321
```

Response: status `404`

```
{
    "message": "No ama with id (ayxwvutsrqponmlkjihgfedcba0987654321) found.",
    "ama": null
}
```

2. When the id is malformed (not the correct format for the database):

Request: `[GET] /api/ama/1`

Response: status `500`

```
{
    "message": "Error requesting ama with id 1"
}
```

---

### [UPDATE] `/api/ama/question/id`

Update a specific ama's question.

#### Examples:

Request: `[UPDATE] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

```
{
  question: 'What is Lambda School all about?'
}
```

Response: status `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What is Lambda School all about?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```
