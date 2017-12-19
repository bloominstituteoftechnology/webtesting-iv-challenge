# Server-Testing
## Walmart API
![Wallmart Logo](./images/walmart-logo.jpg)

### Get a List of items
`GET /items`

##### Response
`Status: 200 OK`
```
[
  {
  _id: "5a39514fb064d51bd4233f53",
  name: "Panasonic 60” Premiere 4K Ultra HD Smart TV",
  salePrice: 1299,
  __v: 0,
  stock: "Available",
  color: "black",
  brandName: "Panasonic"
  },
  {
  _id: "5a395246b064d51bd4233f54",
  name: "HTC VIVE Virtual Reality System + Deluxe Audio Strap",
  salePrice: 899,
  __v: 0,
  stock: "Available",
  color: "white",
  brandName: "HTC"
  }
]
```

### Add a new item
`POST /items`

##### POST parameters
Name         | Type          | Description
------------ | ------------- | -------------
Name         | String        | Required, Unique
salePrice    | Number        | Required
brandName    | String        | Default: null
color        | String        | Default: null
stock        | String        | Default: "Available"

##### Response
`Status: 201 Created`
```
{
    "__v": 0,
    "name": "HTC VIVE Virtual Reality System + Deluxe Audio Strap",
    "salePrice": 899,
    "_id": "5a395246b064d51bd4233f54",
    "stock": "Available",
    "color": "white",
    "brandName": "HTC"
}
```