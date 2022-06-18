const NFTJail = artifacts.require("./NFTJail.sol");
const SimpleNFT = artifacts.require("./SimpleNFT.sol");
const IPFSHash = 'QmXietvZGjLzmKUpQPW4syjmwWboATzUsqJucYEBvfKPf6';
const truffleAssert = require("truffle-assertions");

contract("NFTJail", accounts => {
	it("token with parent should not already exist", async () => {
		const nftJailInstance = await NFTJail.deployed();
		const simpleNFTInstance = await SimpleNFT.deployed();

		// Mint an NFT to use in tests
		const currentSimpleNFTId = await mintSimpleNFT(simpleNFTInstance, accounts[1]);

		// Verify the mint was successful
		const ownerOfToken = await simpleNFTInstance.ownerOf(currentSimpleNFTId);
		assert.equal(ownerOfToken, accounts[1], 'Owner of token does not match address');

		// Mint the token
		await truffleAssert.passes(
			nftJailInstance.mint(simpleNFTInstance.address, currentSimpleNFTId, IPFSHash, {from: accounts[1]})
		);

		// Try to mint the token again with the same parent
		await truffleAssert.fails(
			nftJailInstance.mint(simpleNFTInstance.address, currentSimpleNFTId, IPFSHash, {from: accounts[1]})
		);
	});

	it("should pass if address owns parent token", async () => {
		const nftJailInstance = await NFTJail.deployed();
		const simpleNFTInstance = await SimpleNFT.deployed();

		// Mint an NFT to use in tests
		const currentSimpleNFTId = await mintSimpleNFT(simpleNFTInstance, accounts[1]);

		await truffleAssert.passes(
			nftJailInstance.mint(simpleNFTInstance.address, currentSimpleNFTId, IPFSHash, {from: accounts[1]})
		);
	});

	it("should fail if address does not own parent token", async () => {
		const nftJailInstance = await NFTJail.deployed();
		const simpleNFTInstance = await SimpleNFT.deployed();

		// Mint an NFT to use in tests
		const currentSimpleNFTId = await mintSimpleNFT(simpleNFTInstance, accounts[1]);

		await truffleAssert.fails(
			nftJailInstance.mint(simpleNFTInstance.address, currentSimpleNFTId, IPFSHash, {from: accounts[2]})
		);
	});

	it("should increment token id counter after successful mint", async () => {
		const nftJailInstance = await NFTJail.deployed();
		const simpleNFTInstance = await SimpleNFT.deployed();

		// Mint an NFT to use in tests
		const currentSimpleNFTId = await mintSimpleNFT(simpleNFTInstance, accounts[1]);

		const currentTokenId = (await nftJailInstance.tokenIdCounter()).toNumber();

		await nftJailInstance.mint(simpleNFTInstance.address, currentSimpleNFTId, IPFSHash, {from: accounts[1]})

		const newCurrentTokenId = (await nftJailInstance.tokenIdCounter()).toNumber();

		assert.equal( newCurrentTokenId, currentTokenId + 1, 'Token id not incremented correctly' );
	});

	it("should return correct owner after successful mint", async () => {
		const nftJailInstance = await NFTJail.deployed();
		const simpleNFTInstance = await SimpleNFT.deployed();

		// Mint an NFT to use in tests
		const currentSimpleNFTId = await mintSimpleNFT(simpleNFTInstance, accounts[1]);

		await nftJailInstance.mint(simpleNFTInstance.address, currentSimpleNFTId, IPFSHash, {from: accounts[1]})

		const currentTokenId = (await nftJailInstance.tokenIdCounter()).toNumber();
		const ownerOfToken = await nftJailInstance.ownerOf(currentTokenId);

		assert.equal( ownerOfToken, accounts[1], 'Owner of token does not matchess address' );

	});

	it("should return correct token URI after successful mint", async () => {
		const nftJailInstance = await NFTJail.deployed();
		const simpleNFTInstance = await SimpleNFT.deployed();

		// Mint an NFT to use in tests
		const currentSimpleNFTId = await mintSimpleNFT(simpleNFTInstance, accounts[1]);

		await nftJailInstance.mint(simpleNFTInstance.address, currentSimpleNFTId, IPFSHash, {from: accounts[1]})

		const currentTokenId = (await nftJailInstance.tokenIdCounter()).toNumber();
		const tokenURI = await nftJailInstance.tokenURI(currentTokenId);

		assert.equal( tokenURI, 'ipfs://' + IPFSHash, 'Token URI does not matched expected' );

	});

	it("should accept eth in receive function", async () => {
		const nftJailInstance = await NFTJail.deployed();
		const previousBalance = await web3.eth.getBalance(nftJailInstance.address);
		const weiToSend = 500000;
		await truffleAssert.passes(
			web3.eth.sendTransaction({
				from: accounts[0],
				to: nftJailInstance.address,
				value: weiToSend
			})
		);
		const newBalance = await web3.eth.getBalance(nftJailInstance.address);

		assert.equal(parseInt(newBalance), parseInt(previousBalance) + parseInt(weiToSend), "New balance is not correct");
	});

	/*******************
	 * Helper functions
	 *******************/

	/**
	 * Mints a simple NFT and returns the token id
	 */
	const mintSimpleNFT = async (simpleNFTInstance, toAddress) => {
		await simpleNFTInstance.safeMint(toAddress);
		return (await simpleNFTInstance.tokenIdCounter()).toNumber();
	}
});
