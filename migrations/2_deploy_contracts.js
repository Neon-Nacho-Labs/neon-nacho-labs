var NFTJail = artifacts.require("./NFTJail.sol");
var SimpleNFT = artifacts.require("./SimpleNFT.sol");
const neonNachoLabsAddress = '0xEb4f2c899EAC207b8aa856D9aB10892EC950886E';

module.exports = async function(deployer, network, accounts) {
	console.log('account: ', accounts[0]);
	// if (network === "develop" || network === "goerli" || network === "goerli-fork" || network === "test") {
		await deployer.deploy(NFTJail);
	// }

	const nftJailInstance = await NFTJail.deployed();

	// Transfer ownership other Neon Nacho Labs address
	console.log('Transfering ownership to address: ' + neonNachoLabsAddress);
	await nftJailInstance.transferOwnership(neonNachoLabsAddress);
};

// Uncomment when running tests, and comment above block
// module.exports = function(deployer, network) {
// 		deployer.deploy(NFTJail);
// 		deployer.deploy(SimpleNFT);
// };