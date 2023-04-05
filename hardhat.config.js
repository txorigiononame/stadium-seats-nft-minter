require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv/config");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    
    networks: {
      hardhat: {
      },
      testnet: {
        url: "https://data-seed-prebsc-1-s1.binance.org:8545",
        chainId: 97,
        gasPrice: 20000000000,
        accounts: [process.env.BNB_WALLET_PRIVATE_KEY],
        },
      },

  solidity: "0.8.17",

  etherscan: {
    apiKey: process.env.BNBTESTNETSCAN_API_KEY,
  },
  
};

