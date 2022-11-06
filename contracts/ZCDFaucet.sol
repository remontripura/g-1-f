// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Context.sol";

interface MinimalERC20 {

    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
} 

contract Fuacet is Context {

    MinimalERC20 zankoocodeToken;

    uint256 public constant amountToWithdraw = 24e18;
    
    constructor(address _externalContract) {
        // Initialize a MinimalERC20 contract instance
        zankoocodeToken = MinimalERC20(_externalContract);
    }

    function getTokenReserve () public view returns(uint) {
        return zankoocodeToken.balanceOf(address(this));
    } 

    function withdraw () public returns (bool) {
        require(_msgSender() != address(0), "ZCD-Faucet: address zero passed");
        require(getTokenReserve() > amountToWithdraw, "ZCD-Faucet: Faucet doesnt have enough balance");
        require(zankoocodeToken.balanceOf(_msgSender()) < amountToWithdraw, "ZCD-Faucet: don't greed, you have enough balance");
        zankoocodeToken.transfer(_msgSender(), amountToWithdraw);
        return true;

    }
}