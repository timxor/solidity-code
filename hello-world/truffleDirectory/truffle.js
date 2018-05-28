// kovan network deployment settings
module.exports = {
	networks: {
		kovan: {
			host: "127.0.0.1",
			port: 8545,
			network_id: 42,
			gas: 4700000,
			gasPrice: 25000000000
		},
	}
};
