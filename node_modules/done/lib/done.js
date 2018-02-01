var fs = require('fs'),
    path = require('path');
    
function readdirImpl(dir, iterator, finished, recurse) {
  iterator = iterator || function(err, path, isDir, cb) {cb();};
  finished = finished || function() {};
  
  fs.readdir(dir, function(err, files) {
    if (err) return finished(err); // couldn't read dir
    
    var fileCount = files.length; // grab the file count
    if (!fileCount) return finished(); // no files, return immediately
    
    files.forEach(function(file) { // iterate files
      var filePath = path.join(dir, file);
      fs.stat(filePath, function(err, stat) { // stat the file
        var doneCallback = function(err) {
          // when a done callback is invoked, decrement the file counter
          if (--fileCount == 0) finished(); // all of our direct files have been processed
        }
        
        // let the caller know an error occurs (expect them to still invoke cb)
        if (err) return iterator(err, null, false, doneCallback);
        
        if (stat.isDirectory()) { 
          
          iterator(null, filePath, true, function() {
            if (recurse)
              exports.readdirRecursive(filePath, iterator, doneCallback, recurse); // recurse on callback
            else
              doneCallback();
          });   
        }
        else
          iterator(null, filePath, false, doneCallback);
      });
    });
  });
}
    
/**
 * done.readdir(dir, iterator(err, path, isDir, cb){}, finished(err){})
 * 
 * Reads a directory, invoking iterator() for each item discovered.
 * The iterator must call cb() after processing each item. The
 * master callback function finished() will be invoked after all items
 * have been discovered and procesed by iterator.
 */
exports.readdir = function(dir, iterator, finished) {
  readdirImpl(dir, iterator, finished, false);
}

/**
 * done.readdirRecursive(dir, iterator(err, path, isDir, cb){}, finished(err){})
 * 
 * Recursively reads a directory, invoking iterator() for each item 
 * discovered. The iterator must call cb() after processing each item. The
 * master callback function finished() will be invoked after all items
 * have been discovered and procesed by iterator.
 */
exports.readdirRecursive = function(dir, iterator, finished) {
  readdirImpl(dir, iterator, finished, true);
}

/**
 * done.mkdirRecursive(dir, mode, iterator(err, path, cb){}, finished(err){})
 * 
 * Recursively creates a directory with the provided mode. The master 
 * callback function finished() will be invoked after the entire
 * path has been created.
 */
exports.mkdirRecursive = function(dir, mode, iterator, finished) {
  dir = path.resolve(dir);
  mode = mode || 0777;
  iterator = iterator || function(err, path, cb) {cb();}
  finished = finished || function() {}
  
  fs.mkdir(dir, mode, function(err) {
    if (!err)
      return iterator(null, dir, finished);
      
    var parent = path.dirname(dir);
    var done = function(err) {
      // if this gets called, then we were trying to create the parent dir
      if (err) return finished(err);
      exports.mkdirRecursive(dir, mode, iterator, finished);
    }
    
    if (err) {
      if (err.code == "ENOENT") // parent dir doesn't exist, create it
        exports.mkdirRecursive(parent, mode, iterator, done); 
      else if (err.code == "EEXIST") // dir already exists, ok
        finished();
      else // unknown error, abort
        finished(err);
    }
  });
}
