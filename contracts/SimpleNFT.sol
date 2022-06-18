// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * A very basic NFT contract used for testing the main contract
 * Uses the artwork from the hobotown CC0 project
 */
contract SimpleNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;
	string public uriSuffix = ".json";

    constructor() ERC721("SimpleNFT", "SIMPLENFT") {}

    function safeMint(address to) public onlyOwner {
		// TODO: add check to not go over max supply
		tokenIdCounter.increment();
        uint256 tokenId = tokenIdCounter.current();
        _safeMint(to, tokenId);
    }

	function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmQLuNf5SqqzJWtHN71N7ARoezni9eqrBMQVmoMqVpxEum/";
    }

	function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        Strings.toString(_tokenId),
                        uriSuffix
                    )
                )
                : "";
    }
}