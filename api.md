# API Documentation

Documentation for all APIs.

### Server endpoint: `http://localhost:3333`

### All API endpoints: `http://localhost:3333/api`

---

## `/ama`

**Description**: an API for creating AMAs (ask me anything) with a `question`, `answer`, and `answered` field.

All `/ama` **API** endpoints

| endpoint        | type   | description                                                                    | output | type   |
| --------------- | ------ | ------------------------------------------------------------------------------ | ------ | ------ |
| `/ama/question` | POST   | Creates an AMA and saves it to the database.                                   | JSON   | Object |
| `/ama`          | GET    | Requests all AMAs                                                              | JSON   | Array  |
| `/ama/id`       | GET    | Requests the AMA with `id`                                                     | JSON   | Object |
| `/ama/id`       | UPDATE | Updates either the question or answer field (but not both) of an AMA with `id` | JSON   | Object |
| `/ama/id`       | DELETE | Deletes the AMA with `id`                                                      | JSON   | Object |

---

### [POST] `/api/ama/question`

**Description**: creates an AMA and saves it to the database.

#### Example:

Request: `[POST] /api/ama/question`

```
{
  question: 'What is Lambda School all about?'
}
```

Response: status code `201`

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

1. Questions in the database must be **unique** (no duplicate questions).

---

### [GET] `/api/ama`

**Description**: gets all AMAs.

#### Example:

Request: `[GET] /api/ama`

Response: status code `200`

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

---

### [GET] `/api/ama/id`

**Description**: gets the specific AMA with `id`.

#### Examples:

#### _Unanswered AMA_:

Request: `[GET] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

Response: status code `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What is Lambda School all about?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### _Answered AMA_:

Request: `[GET] /api/ama/zyxwvutsrqponmlkjihgfedcba0987654321`

Response: status code `200`

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

1. When the AMA with `id` does not exist:

Request: `[GET] /api/ama/ayxwvutsrqponmlkjihgfedcba0987654321`

```
incorrect id (starts with a) - ayxwvutsrqponmlkjihgfedcba0987654321
correct id   (starts with z) - zyxwvutsrqponmlkjihgfedcba0987654321
```

Response: status code `404`

```
{
    "message": "No ama with id (ayxwvutsrqponmlkjihgfedcba0987654321) found.",
    "ama": null
}
```

2. When the `id` is malformed (incorrect format for the database to parse):

Request: `[GET] /api/ama/1`

Response: status code `500`

```
{
    "message": "Error requesting ama with id 1"
}
```

---

### [UPDATE] `/api/ama/id`

**Description**: update the specific AMA's question or answer with `id`.

#### Examples:

#### _Updating the question for an AMA_:

Request: `[UPDATE] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

```
{
  question: 'What programs are available at Lambda School?'
}
```

Response: status code `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What programs are available at Lambda School?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### _Answering the question for an AMA_:

Request: `[UPDATE] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

```
{
  answer: 'There is a full-stack and a machine-learning program.'
}
```

Response: status code `200`

```
{
  id: 1234567890abcdefghijklmnopqrstuvwxyz,
  question: 'What programs are available at Lambda School?',
  answer: 'There is a full-stack and a machine-learning program.'
  answered: true,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### Notes

1. The `answered` field is automatically changed to `true` if an answer is provided.

---

### [DELETE] `/api/ama/id`

**Description**: deletes the specific AMA with `id`.

#### Example:

Request: `[DELETE] /api/ama/1234567890abcdefghijklmnopqrstuvwxyz`

Response: status code `200`

```
{
  deleted: true
}
```

---

## Notes

1. Don't forget to create pull requests if you see anything.
1. Enjoy!
