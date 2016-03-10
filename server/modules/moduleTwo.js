var randomNumber = function(min, max){
  return Math.floor(Math.random()*(1 + max - min) + min);
};


var skillSet = function(skills){
  return skills[randomNumber(0,2)];
}

module.exports= skillSet;
