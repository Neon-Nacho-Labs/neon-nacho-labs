var NFTJail = artifacts.require("./NFTJail.sol");
var SimpleNFT = artifacts.require("./SimpleNFT.sol");

module.exports = function(deployer, network) {
	if (network === "develop" || network === "goerli" || network === "goerli-fork") {
		deployer.deploy(NFTJail);
		deployer.deploy(SimpleNFT);
	}
	// TODO: change ownership after deploying
};
