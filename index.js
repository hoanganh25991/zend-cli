#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require("commander");
var fs = require("fs");
var path = require("path");

program.version("0.0.0", "-v");

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
var src = path.join(zendCliRoot, defaultSkeleton);
console.log("src\t%s", src);

/**
 * @var string currentLocation
 * where user run CLI
 */
var currentLocation = path.resolve(process.cwd());
console.log("currentLocation\t%s", currentLocation);


/**
 * CREATE ZEND SKELETON
 */
/**
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */

var copyRecursiveSync = function(src, dest){
  var srcExists = fs.existsSync(src);
  var stats = srcExists && fs.statSync(src);
  var isDirectory = srcExists && stats.isDirectory();
  if(isDirectory){
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName){
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  }else{
    fs.linkSync(src, dest);
  }
};

program
  .command("skeleton <name>")
  .action(function(name){
    console.log("running...");
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

/**
 * CREATE ZEND MODULE & ACTIVE IT
 */

var replaceFrontEnd = function(dir, filename, moduleName){
  /** @var string modulePHP */
  var filePath = path.join(dir, filename);
  var readFile = fs.readFileSync(filePath, "utf8");
  readFile = readFile.replace(/FrontEnd/g, moduleName);
  var c = require("change-case");
  readFile = readFile.replace(/front-end/g, c.paramCase(moduleName));
  fs.writeFileSync(filePath, readFile);

};
program
  .command("module <name>")
  .action(function(name){
    /**
     * 1. copy to right place /currentProject/module/{moduleName}
     * handle error when user NOT inside any project
     */
    var moduleName = name || "moduleX";
    console.log(moduleName);
    var moduleFrontEnd = path.join(src, "module", "FrontEnd");
    console.log(moduleFrontEnd);
    var moduleNew = path.join(currentLocation, "module", moduleName);
    console.log(moduleNew);
    if(!fs.existsSync(moduleNew)){
      copyRecursiveSync(moduleFrontEnd, moduleNew);
      console.log("copy src1\t\%s to moduleNew\t%s", moduleFrontEnd, moduleNew);
      /**
       * 2. change module default named "FrontEnd" to <name>
       *   src1/FrontEnd to src1/<name>
       *   view/front-end to view/<name>(snake-case)
       *   config/module.config.php
       *   namespace FrontEnd in Module.php to <name>
       *   namespace FrontEnd in IndexController.php to <name>
       */
      var moduleSrcOld = path.join(moduleNew, "src", "FrontEnd");
      var moduleSrcNew = path.join(moduleNew, "src", moduleName);
      fs.renameSync(moduleSrcOld, moduleSrcNew);
      var c = require("change-case");
      var moduleViewOld = path.join(moduleNew, "view", "front-end");
      var moduleViewNew = path.join(moduleNew, "view", c.paramCase(moduleName));
      fs.renameSync(moduleViewOld, moduleViewNew);

      var fileName = "module.config.php";
      var configModuleConfigPHPPath = path.join(moduleNew, "config");
      replaceFrontEnd(configModuleConfigPHPPath, fileName, moduleName);

      fileName = "Module.php";
      var modulePHPPath = path.join(moduleNew);
      replaceFrontEnd(modulePHPPath, fileName, moduleName);

      fileName = "IndexController.php";
      var indexControllerPath = path.join(moduleNew, "src", moduleName, "Controller");
      replaceFrontEnd(indexControllerPath, fileName, moduleName);

      /**
       * 3. active this module in application.config.php
       */
      fileName = "application.config.php";
      var configApplicationFilePath = path.join(currentLocation, "config", fileName);
      var readFile = fs.readFileSync(configApplicationFilePath, "utf8");
      var arr = readFile.split(")");
      var newApplicationConfigPHPFile = arr[0] + "\'" + moduleName + "\'" + ",)";
      for(var i = 1; i < arr.length; i++){
        newApplicationConfigPHPFile += arr[i];
      }
      console.log(newApplicationConfigPHPFile);
      fs.writeFileSync(configApplicationFilePath, newApplicationConfigPHPFile);
    }else{
      console.log("module already exists\t%s", moduleNew);
    }

  });

program.parse(process.argv);
