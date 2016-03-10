var randomNumber = function(min, max){
  return Math.floor(Math.random()*(1 + max - min) + min);
};

skills=["Front End","Clientside Logic", "Serverside Logic"];
var skillSet = function(){
  return skills[randomNumber(0,2)];
}

module.exports= skillSet;
