import { ethers } from "hardhat"
import * as dotenv from 'dotenv'
dotenv.config()

async function main() {

  const WETH = await ethers.getContractFactory(
    "WETH"
  );
  const weth = await WETH.deploy();
  await weth.deployed();
  
  console.log(
    `WETH was deployed to: ${weth.address}`
  );

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("Test Token", "TT", ethers.utils.parseEther("10000"));
  await token.deployed();

  console.log(
    `ERC20 Token was deployed to: ${token.address}`
  );

  const Vault = await ethers.getContractFactory(
    "Vault"
  );
  const vault = await Vault.deploy(weth.address)
  await vault.deployed();

  console.log(
    `CHARACTER_SHOP was deployed to: ${vault.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
