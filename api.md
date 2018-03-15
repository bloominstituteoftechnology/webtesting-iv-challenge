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

### [POST] `/api/ama`

Creates an ama and saves it to the database.

#### Examples:

Request

```
{
  question: 'What is Lambda School all about?'
}
```

Response

```
{
  id: 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ,
  question: 'What is Lambda School all about?',
  answered: false,
  createdOn: 'YYYY-MM-DDT00:00:00.000Z',
  __v: 0
}
```

#### Notes

1. Questions in the database must be unique (no duplicate questions).
1. Answers do not have to be unique.
