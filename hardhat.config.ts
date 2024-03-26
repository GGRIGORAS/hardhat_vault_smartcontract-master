import { HardhatUserConfig } from "hardhat/config";
import "hardhat-abi-exporter";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";
dotenv.config();

const defaultPrivateKey = process.env.PRIVATE_KEY;
const defaultMnemonicWallet = process.env.MNEMONIC_VAULT ;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    only: ["Vault"],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    local: {
      url: "http://127.0.0.1:8545",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 43112,
    },
    main: {
      url: "https://mainnet.infura.io/v3/",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 1,
      gas: "auto",
      gasPrice: 10000000000, // 10 [GWei]
    },
    test: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 5,
      gas: "auto",
      gasPrice: 10000000000, // 10 [GWei]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
