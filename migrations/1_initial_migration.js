var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network) {
  if (network === "develop") {
    deployer.deploy(Migrations);
  }
};
