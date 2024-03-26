// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("Wrapped Ether", "WETH") {}

    // Function to deposit Ether and mint WETH tokens to the sender's address
    function deposit() public payable {
        super._mint(msg.sender, msg.value);
    }

    // Function to withdraw Ether by burning WETH tokens
    function withdraw(uint amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        super._burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }

    // Receive function to handle direct ether transfers to the contract
    receive() external payable {
        deposit();
    }
}