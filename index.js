#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require("commander");

program.version("0.0.0", "-v");

/**
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var fs = require("fs");
var path = require("path");
var copyRecursiveSync = function(src, dest) {
  var destExists = fs.existsSync(dest);
    var srcExists = fs.existsSync(src);
    var stats = srcExists && fs.statSync(src);
    var isDirectory = srcExists && stats.isDirectory();
    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursiveSync(path.join(src, childItemName),
          path.join(dest, childItemName));
      });
    } else {
      fs.linkSync(src, dest);
    }
};

/**
 * create zend-skeleton
 */
program
  .command("createproject <name>")
  .action(function(name){
    console.log("running...");


    /**
     * @var string zendCliRoot
     * where this module located
     * in Window, may be inside /program/nodejs/node_modules/{this_module}
     * in Unix, may be /user/bin/env/node_modules/{this_module}
     */
    var zendCliRoot = path.dirname(require.main.filename);
    /**
     * @var string defaultSkeleton
     * inside {this_module}, we have a zend skeleton folder named "default-skeleton"
     * zend framework can run immediately by config in "default-skeleton" folder
     */
    var defaultSkeleton = "default-skeleton";
    /**
     * @var string src
     * path to zend skeleton in {this_module}
     */
    var src = path.join(zendCliRoot, defaultSkeleton);console.log("src\t%s", src);

    /**
     * @var string currentLocation
     * where user run CLI
     */
    var currentLocation = path.resolve(process.cwd());;console.log("currentLocation\t%s", currentLocation);
    var projectName = name || "zend-skeleton";
    /**
     * @var string dest
     * create zend skeleton inside currentLocation
     */
    var dest = path.join(currentLocation, projectName);
    if(!fs.existsSync(dest)){
      copyRecursiveSync(src, dest);
      console.log("completed");
    }else{
      console.log("destination already exits\t%s", dest);
    }
  });



program.parse(process.argv);
