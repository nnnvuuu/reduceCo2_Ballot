



var Ballot = artifacts.require("ReduceCo2Ballot");
 
module.exports = function(deployer) {
  deployer.deploy(Ballot,4);
};
