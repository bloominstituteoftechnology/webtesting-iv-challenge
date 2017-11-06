# **ARTIST API**
Created By Track7Dev

## **Features**
- Add Artist
- Access All Artists
- Update Artist Info
- Delete Artist

## **Start**
- --
Install npm dependencies using ``` npm install ``` inside the root directory

``` nodemon  ```: 
```
npm i -g nodemon
```

- --
``` MONGO  ```

Start ``` mongo ``` form the project root directory

 ``` windows``` 


```
c:/'program files'/mongodb/server/:version/bin/mongod.exe --dbpath data
```

``` EXPRESS ```

Start Express Server Using ``` nodemon ``` from the root directory

```
npm start
```

- --
## **Server Routes**
### **Add Artist**

Add a new Artist by sending a resquest ```body``` with the properties: ```name```, ```age```, ```specialty```
```
POST /add-artist
```
```javascript
{
  name: 'Artist Name',
  age: 27,
  specialty: 'Artist Specialty'
}
```
### **Get Artists**

Return back all the Artists in the database
```
GET /artists
```

### **Update Artist**

Update the Artist information in the database by sending a request ```body``` with the properties: ```name```, ```age```, ```specialty```
```
PUT /update-artist/:id
```
```javascript
//Before
{
  name: 'Artist Name',
  age: 27,
  specialty: 'Artist Specialty'
}

//After
{
  name: 'Updated Name',
  age: 77,
  specialty: 'Updated'
}
```

### **Add Client**
Add a Client to the artist selected by id and send a request ```body``` with a name property.
```
PUT /artist/:id/add-client
```
```
{
  name: 'Client Name'
}
```

### **Remove Artist**
Remove Artist by ```id```
```
DELETE /remove-artist/:id
```

## **Schema**

```METHODS```
### **Change Name**
Changes the current Artist's ```name```
```
artist.changeName('Changed Name');
```
```javascript
//Before
{
  name: 'ArtistName',
  age: 27,
  specialty: 'Black & Grey'
}

//After
{
  name: 'Changed Name',
  age: 27,
  specialty: 'Black & Grey'
}
```

### **Artist Info**
Returns back the Artist ```info```
```javascript
artist.info();
```
### **Add To Rank**
Adds Points to the Artist ```rank```
```javascript
artist.addToRank('20');
```
### **Add Client**
Adds A Client to the Artist
```javascript
artist.addClient('Client Name', (UpdatedArtist) => {
  return UpdatedArtist.clients; // [...clientID, (New Client ID)]
});
```
``` STATICS ```
### **Find Artist**
Finds Artist by ```name```
```javascript
ArtistSchema.findArtist('Artist Name', (artist) => {
  return artist; 
  // {
      name: 'Artist Name',
      age: 27,
      ...
    }
});
```
### **Find All**
Finds all Artists in database
```javascript
ArtistSchema.findAll((artists) => {
  return artists;
  // [{
        name: 'Artist 1',
        age: 27,
        ...
      },
      {
        name: 'Artist 2',
        age: 27,
        ...
      },
      {
        name: 'Artist 3',
        age: 27,
        ...
      }]
});
```
