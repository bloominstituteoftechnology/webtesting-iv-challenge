# Done for Node.js 

Asynchronous file system helpers for Node.js

[![Build Status](https://secure.travis-ci.org/sharpfog/done.png)](http://travis-ci.org/sharpfog/done)

## Motivation

Done provides asynchronous file system helpers (with completion callbacks) for common operations in Node.js. Some helpers are similar to those found in the excellent [wrench-js](https://github.com/ryanmcgrath/wrench-js) with a couple important differences:

1.  Done helpers are all asyncronous.
2.  Done helpers accept a completion function that is called after the entire operation is "done". 
3.  Most done helpers accept an iterator function that is called per each item.

## Installation
Done is available via npm:

```
npm install done
```

## API
``` js
// Reads the contents of a directory
done.readdir(dir, iterator, finished);

// Reads the contents of a directory and recurses into subdirectories
done.readdirRecursive(dir, iterator, finished);

// Creates a directory and recursively creates parents (mkdir -p)
done.mkdirRecursive(dir, mode, iterator, finished);
```

## Usage

### Reading a directory

The following example shows how to read a directory with both an iterative callback (called every time an item is discovered) and a completion callback (called when every item has been discovered).

``` js
var done = require('done');

done.readdir('./', 
  function(err, path, isDir, cb) {
    if (err) console.log("An error occured " + err);
    else console.log("Discovered item " + path);
      
    cb(); // always call cb() when you're finished
  },
  function(err) {
    if (err) console.log("An error occured " + err);
    else console.log("Finished reading dir!");
  });

```

You can also omit the completion callback.

``` js
var done = require('done');

done.readdir('./', 
  function(err, path, isDir, cb) {
    if (err) console.log("An error occured " + err);
    else console.log("Discovered item " + path);
      
    cb(); // always call cb() when you're finished
  });

``` 

### Recursively reading a directory

The following example shows how to recursively read a directory with both an iterative callback (called every time an item is discovered) and a completion callback (called when every item has been discovered).

``` js
var done = require('done');

done.readdirRecursive('./', 
  function(err, path, isDir, cb) {
    if (err) console.log("An error occured " + err);
    else console.log("Discovered item " + path);
      
    cb(); // always call cb() when you're finished
  },
  function(err) {
    if (err) console.log("An error occured " + err);
    else console.log("Finished reading dir!");
  });

```

### Recursively making a directory

The following example shows how to recursively create a directory (and all missing parent directories). The first callback is called for each directory that's created and the second callback is called after the entire path has been created (or an error occurs).

This is similar to *nix `mkdir -p`.

``` js
done.mkdirRecursive("my/test/path", 0777, 
  function(err, path, cb) {
    if (err) console.log("An error occured " + err);
    else console.log("Created path" + path);
    cb();
  },
  function(err) {
    if (err) console.log("An error occured " + err);
    else console.log("Finished!");
  });
```
