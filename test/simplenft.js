const SimpleNFT = artifacts.require("./SimpleNFT.sol");
const truffleAssert = require("truffle-assertions");

contract("SimpleNFT", accounts => {
	it("should return correct owner after successful mint", async () => {
		const simpleNFTInstance = await SimpleNFT.deployed();
		await simpleNFTInstance.safeMint(accounts[1]);
		const currentTokenId = await simpleNFTInstance.tokenIdCounter();
		const ownerOfToken = await simpleNFTInstance.ownerOf(currentTokenId);

		assert.equal( ownerOfToken, accounts[1], 'Owner of token does not matchess address' );

	});

	it("should return correct token URI after successful mint", async () => {
		const simpleNFTInstance = await SimpleNFT.deployed();
		await simpleNFTInstance.safeMint(accounts[1]);
		const currentTokenId = await simpleNFTInstance.tokenIdCounter();
		const tokenURI = await simpleNFTInstance.tokenURI(currentTokenId);

		assert.equal( tokenURI, 'ipfs://QmQLuNf5SqqzJWtHN71N7ARoezni9eqrBMQVmoMqVpxEum/' + currentTokenId + '.json', 'Token URI does not matched expected' );
	});

	it("should fail for nonexistant token", async () => {
		const simpleNFTInstance = await SimpleNFT.deployed();
		await truffleAssert.fails(
			// Token id 0 won't exist in the contract. Starts at 1.
			simpleNFTInstance.tokenURI(0)
		);
	});
});
