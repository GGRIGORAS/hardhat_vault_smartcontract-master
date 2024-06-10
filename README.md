Overview

This project is an institutional-grade on-chain option protocol designed to transition option trading from centralized exchanges (CEXs) to decentralized exchanges (DEXs). It offers capital-efficient on-chain structured products and adheres to AML/KYC compliance standards.

Mission

The mission is to unlock the full potential of on-chain derivatives, revolutionizing the efficiency of hedging and investment tools compared to traditional financial markets.

Importance of the Vault Contract in Decentralized Exchange (DEX)

The Vault contract is a critical component in the infrastructure of a DEX, especially for a platform specializing in on-chain options. Its significance includes:

- Asset Security: Ensuring that deposited assets (both ETH and ERC20 tokens) are secure and protected from unauthorized withdrawals.
- Capital Efficiency: Facilitating efficient capital management by allowing users to deposit, withdraw, wrap, and unwrap ETH within the Vault, thereby saving on gas fees and time.
- User Trust: Building user confidence by ensuring funds are secure and accessible when needed.
- Operational Integrity: Maintaining the integrity of the platform by correctly handling deposits and withdrawals.
- Compliance: Supporting AML/KYC compliance by integrating necessary checks within the transaction process.

Task Implementation

The task involves creating a Vault smart contract in Solidity, suitable for deployment on Ethereum, with the following functionalities:

ETH Deposit and Withdrawal

DepositETH: Users can deposit ETH into the contract using the depositETH function.

function depositETH() external payable {
    balances[msg.sender] += msg.value;
}

WithdrawETH: Users can withdraw ETH using the withdrawETH function, ensuring they do not withdraw more than their balance.

function withdrawETH(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount, "Insufficient ETH balance");
    balances[msg.sender] -= amount;
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "ETH transfer failed");
}

ERC20 Token Deposit and Withdrawal

DepositToken: Users can deposit ERC20 tokens using the depositToken function.

function depositToken(IERC20 token, uint256 amount) external {
    token.safeTransferFrom(msg.sender, address(this), amount);
    tokenBalances[msg.sender][address(token)] += amount;
}

WithdrawToken: Users can withdraw ERC20 tokens using the withdrawToken function.

function withdrawToken(IERC20 token, uint256 amount) external nonReentrant {
    require(tokenBalances[msg.sender][address(token)] >= amount, "Insufficient token balance");
    tokenBalances[msg.sender][address(token)] -= amount;
    token.safeTransfer(msg.sender, amount);
}

Wrapping and Unwrapping ETH

WrapETH: Users can wrap their ETH into WETH within the Vault.

function wrapETH(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount, "Insufficient ETH balance");
    balances[msg.sender] -= amount;
    weth.deposit{value: amount}();
    tokenBalances[msg.sender][address(weth)] += amount;
}

UnwrapETH: Users can unwrap their WETH into ETH within the Vault.

function unwrapETH(uint256 amount) external nonReentrant {
    require(tokenBalances[msg.sender][address(weth)] >= amount, "Insufficient WETH balance");
    tokenBalances[msg.sender][address(weth)] -= amount;
    weth.withdraw(amount);
    balances[msg.sender] += amount;
}

Additional Features

- ReentrancyGuard: Prevents reentrancy attacks using OpenZeppelin's ReentrancyGuard.
- Ownable: Provides basic authorization control functions using OpenZeppelin's Ownable.
- SafeERC20: Ensures safe ERC20 token transfers using OpenZeppelin's SafeERC20.

Update WETH Contract Address

updateWETH: Allows the contract owner to update the WETH contract address.

function updateWETH(address _weth) external onlyOwner {
    weth = IWETH(_weth);
}

Summary

This Vault smart contract is designed to securely manage ETH and ERC20 token deposits and withdrawals, facilitate the wrapping and unwrapping of ETH, and ensure compliance with AML/KYC standards. It incorporates security measures such as reentrancy protection and safe token transfer methods, making it a robust and reliable component for decentralized exchanges.
