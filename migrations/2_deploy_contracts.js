var NFTJail = artifacts.require("./NFTJail.sol");
var SimpleNFT = artifacts.require("./SimpleNFT.sol");

module.exports = function(deployer, network) {
	// if (network === "develop" || network === "goerli" || network === "goerli-fork" || network === "test") {
		deployer.deploy(NFTJail);
		deployer.deploy(SimpleNFT); // Uncomment when running tests
	// }
	// TODO: change ownership after deploying
};
