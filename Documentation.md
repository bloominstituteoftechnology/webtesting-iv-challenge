# API for TV Series

Included should only give an array of objects listing a show's name and network they aired on.

[Look up shows](www.google.com)

#### CRUD operations

* `GET` response

  * on endpoint `/api/shows` gives you an array of show name and network.

---

* `PUT` requests

  * add a show on `/api/shows` by adding a JSON object as `title:` and `network:` **both required**

  ##### Example:

  ```
  {
    "title:" "a title",
    "network:" "whatever network"
  }
  ```

---

* `DELETE`
  * TBD

- ##### A test file has been included
