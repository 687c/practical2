// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

//additional task

contract Divide {
    address owner;

    function divide() external pure returns (uint256) {
        uint256 a = 3;
        uint256 b = 2;

        uint256 fiveDP = 10**5;

        uint256 res = (a * fiveDP) / b;
        return res;
    }

    function balanceOf(address acc) external view returns (uint256) {
        return address(acc).balance;
    }
}
