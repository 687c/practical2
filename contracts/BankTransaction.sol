// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract BankTx {
    address owner;
    //to gen unique payment ids
    uint128 public txCounter = 0;

    struct BankTransaction {
        uint128 paymentId; //generate unique ids
        address clientId; //
        address recepient;
        uint256 amt;
        uint256 paymentTime;
        string note;
        string hash; //concat the ids
    }

    //array to hold the bank transactions
    BankTransaction[] public txArr;

    // functions
    // add new payment
    function addPayment(
        address client,
        address recepient,
        uint128 amt,
        string calldata note
    ) public {
        //init empty struct
        // BankTransaction memory bankTx;

        //update the counter and assign value to paymentId
        txCounter += 1;
        // BankTransaction({paymentId: txCounter});

        //update the payment time
        uint256 paymentTime = block.timestamp;

        //create the hash
        // uint160 clientAdd = address(uint160(client));
        // uint160 recepientAdd = address(uint160(recepient));

        // uint160 hash = clientAdd + recepientAdd;
        string memory hash = "nothing to see here";

        //push the tx into txArray
        txArr.push(
            BankTransaction({
                paymentId: txCounter,
                clientId: client,
                amt: amt,
                note: note,
                recepient: recepient,
                paymentTime: paymentTime,
                hash: hash
            })
        );
    }

    //view the arrays
    function getAllTxs() external view returns (BankTransaction[] memory) {
        return txArr;
    }

    //getting information about the payment by its identifier
    function getTx(uint104 paymentId)
        external
        view
        returns (BankTransaction memory)
    {
        BankTransaction memory returnFound;

        for (uint256 index = 0; index < txArr.length; index++) {
            if (paymentId == txArr[index].paymentId) {
                returnFound = txArr[index];
                break;
            }
        }
        return returnFound;
    }

    //getting all payments by a certain client
    BankTransaction[] public paymentsArr;

    function getPaymentsByAdd(address addr) external {
        for (uint256 index = 0; index < txArr.length; index++) {
            if (addr == txArr[index].clientId) {
                paymentsArr.push(txArr[index]);
            }
        }
    }

    function getAllPayments() external view returns (BankTransaction[] memory) {
        return paymentsArr;
    }
}
