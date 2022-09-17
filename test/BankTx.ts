import { expect } from "chai";
import { ethers } from "hardhat";
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Bank Transaction", function () {
    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const BankTx = await ethers.getContractFactory("BankTx");

        const bankContract = await BankTx.deploy();

        return { BankTx, bankContract, owner, addr1, addr2 };
    }


    it("adding payments", async function () {
        const { bankContract, owner, addr1 } = await loadFixture(deployTokenFixture);

        let noOfTxs = await (await bankContract.txCounter()).toNumber();
        expect(noOfTxs).to.equal(0);

        await bankContract.addPayment(owner.address, addr1.address, 1230, "this will be the note");
        await bankContract.addPayment(owner.address, addr1.address, 1230, "this will be the note");

        let tx1 = await bankContract.txCounter();
        //expect counter value to have added one tx
        expect(tx1).to.equal(2);

        //println the bank tx
        // let res = await bankContract.getAllTxs();
        // console.log('\tTHIS IS THE RESULT \n', res);

    });

    it("can get specified tx", async function () {
        const { bankContract, owner, addr1 } = await loadFixture(deployTokenFixture);

        await bankContract.addPayment(owner.address, addr1.address, 1230, "number one");
        await bankContract.addPayment(owner.address, addr1.address, 1230, "number two");

        let tx2 = await bankContract.getTx(1);
        expect(tx2.note).to.equal("number one");
        // console.log("\nTHIS IS THE RES\n", tx2);
        let txNull = await bankContract.getTx(10);
        expect(txNull.note).to.equal("");
    });

    it("can get payments by a specified ID", async function () {
        const { bankContract, owner, addr1 } = await loadFixture(deployTokenFixture);

        await bankContract.addPayment(owner.address, addr1.address, 1230, "number one");
        await bankContract.addPayment(owner.address, addr1.address, 1230, "number two");

        await bankContract.getPaymentsByAdd(owner.address);
        let payments = await bankContract.getAllPayments();
        expect(payments.length).to.equal(2);
        // console.log("the payments", payments);
    })
});