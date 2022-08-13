const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
require("dotenv").config();

module.exports = {
	// For easy reference: https://trufflesuite.com/docs/truffle/reference/configuration/
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
		develop: {
			port: 8545
		},
		ropsten: {
			provider: () => new HDWalletProvider({
				mnemonic: process.env.WALLET_MNEMONIC,
				providerOrUrl: process.env.INFURA_NETWORK_URL_ROPSTEN,
				numberOfAddresses: 1
			}),
			network_id: 3,         // Ropsten's id
			gas: 5500000,          // Gas limit. Ropsten has a lower block limit than mainnet
			gasPrice: 30000000000, // 30 gwei
			confirmations: 2,      // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: false    // Skip dry run before migrations? (default: false for public nets )
		},
		rinkeby: {
			provider: () => new HDWalletProvider({
				mnemonic: process.env.WALLET_MNEMONIC,
				providerOrUrl: process.env.INFURA_NETWORK_URL_RINKEBY,
				numberOfAddresses: 1
			}),
			network_id: 4,         // Rinkeby's id
			gas: 5500000,          // Gas limit. Ropsten has a lower block limit than mainnet
			gasPrice: 30000000000, // 30 gwei
			confirmations: 2,      // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: false    // Skip dry run before migrations? (default: false for public nets )
		},
		goerli: {
			provider: () => new HDWalletProvider({
				mnemonic: process.env.WALLET_MNEMONIC,
				providerOrUrl: process.env.INFURA_NETWORK_URL_GOERLI,
				numberOfAddresses: 1
			}),
			network_id: 5,         // Rinkeby's id
			// gas: 5500000,          // Gas limit. Ropsten has a lower block limit than mainnet
			// gasPrice: 30000000000, // 30 gwei
			gasPrice: 30000000000, // 30 gwei
			maxFeePerGas: 50000000000, // Max per unit price (base + priority)
			maxPriorityFeePerGas: 1510000000, // 1.51 gwei
			// confirmations: 2,      // # of confs to wait between deployments. (default: 0)
			// timeoutBlocks: 200,    // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: false    // Skip dry run before migrations? (default: false for public nets )
		},
		mainnet: {
			provider: () => new HDWalletProvider({
				mnemonic: process.env.WALLET_MNEMONIC,
				providerOrUrl: process.env.INFURA_NETWORK_URL_MAINNET,
				numberOfAddresses: 1
			}),
			network_id: 1,
			// gas: 4000000,          // Gas limit.
			// gasPrice: 30000000000, // 30 gwei
			// gasPrice: 61579212861,
			maxFeePerGas: 40000000000, // Max per unit price (base + priority)
			maxPriorityFeePerGas: 1510000000, // 1.51 gwei
			skipDryRun: true
		}
	},
	compilers: {
		solc: {
			version: "^0.8.15",
			optimizer: {
			   enabled: true,
			   runs: 1000
			 },
		}
	},
	plugins: [
		'truffle-flatten',
		'truffle-plugin-verify'
	],
	api_keys: {
		etherscan: process.env.ETHERSCAN_API_KEY
	}
};
