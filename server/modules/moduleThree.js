var name= require("./moduleOne.js");
var skill= require("./moduleTwo.js");

var randomNumber = function(min, max){
  return Math.floor(Math.random()*(1 + max - min) + min);
};


employee={
  "name": name(),
  "skill": skill(),
  "scrum":randomNumber(1,9)
}

module.exports=employee;
