# Routes

## Get
 
`GET /posts`

##### Response

```
Status: 200 ok

[{
  "id": 23ub78dsabi,
  "title": "My Post",
  "author": "Dylan",
  "content": "this is the content to my post",
  "created_at": July 1, 2017
},
{
  "id": 49fh80ujbf,
  "title": "My Post2",
  "author": "Dylan",
  "content": "this is the content to my second post",
  "created_at": July 2, 2017
},
...]
```

## Put
 
`Put /posts/:id`

##### Request

```
{
  "title": "Post Updated",
  "content": "This is the content I am updating"
}
```
##### Response

```
Status: 200 ok

{
  "id": 23ub78dsabi,
  "title": "Post Updated",
  "author": "Dylan",
  "content": "this is the content I am updating",
  "created_at": July 1, 2017
}
```


## Post
 
`Post /posts`

##### Request

```
{
  "title": "Post Added",
  "author": "Dylan",
  "content": "This is the content I am adding"
}
```
##### Response

```
Status: 200 ok

{
  "id": 4byo8brrn94,
  "title": "Post Added",
  "author": "Dylan",
  "content": "This is the content I am adding",
  "created_at": July 3, 2017
}
```

## Delete
 
`Delete /posts/:id`

##### Response

```
Status: 200 ok

{
  "success": "Post was removed"
}
```
