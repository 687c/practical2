// import { expect } from "chai";
import { ethers } from "hardhat";

describe("Divide contract", function () {
    it("Testing the divide task", async function () {
        const [owner] = await ethers.getSigners();

        const Divide = await ethers.getContractFactory("Divide");

        const hardHatContract = await Divide.deploy();

        await hardHatContract.divide();
    });
});