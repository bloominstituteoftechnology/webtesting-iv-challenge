# Bands API

![alt text](/ledzeppelinlive.jpg)

### Method & URL

|    GET     |    POST    |      PUT       |     DELETE     |
| :--------: | :--------: | :------------: | :------------: |
| /api/bands | /api/bands | /api/bands/:id | /api/bands/:id |

### Response

#### [GET]

    --------------
    status: 200 OK
    --------------
    {
        "_id": "5ae23e69f0da3493a8aebe60",
        "name": "Led Zeppelin",
        "genre": "Classic Rock",
        "numberOfMembers": 4,
        "yearFounded": 1968,
        "__v": 0
    }

#### [POST]

|      Name       |  Type  |               Description               |
| :-------------: | :----: | :-------------------------------------: |
|      name       | string |      Creates the name for the band      |
|      genre      | string |     Creates the genre for the band      |
| numberOfMembers | number | Creates the no. of members for the band |
|   yearFounded   | number |  Creates the year founded for the band  |

    -------------------
    status: 201 Created
    -------------------
    {
        "savedBand": {
            "_id": "5ae237f7f0da3493a8aebe5f",
            "name": "Led Zeppelin",
            "genre": "Classic Rock",
            "numberOfMembers": 4,
            "yearFounded": 1968,
            "__v": 0
        }
    }

#### [PUT]

|      Name       |  Type  |                       Description                       |
| :-------------: | :----: | :-----------------------------------------------------: |
|       id        | string | The Mongoose generated id required to update a property |
|      name       | string |              The updated name for the band              |
|      genre      | string |             The updated genre for the band              |
| numberOfMembers | number |               The updated no. of members                |
|   yearFounded   | number |                The updated year founded                 |

    --------------
    status: 200 OK
    --------------  
    {
      "name": "Led Zeppelin",
      "genre": "Classic Rock",
      "numberOfMembers": "4",
      "yearFounded": "1968"
    }  

#### [DELETE]

| Name |  Type  |                       Description                       |
| :--: | :----: | :-----------------------------------------------------: |
|  id  | string | The Mongoose generated id required to delete a property |

    --------------
    status: 200 OK
    --------------  
    {
      "message": "The band was successfully deleted."
    }
