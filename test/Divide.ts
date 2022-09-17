import { expect } from "chai";
import { ethers } from "hardhat";

describe("Divide contract", function () {
    it("Testing the divide task", async function () {
        const [owner] = await ethers.getSigners();

        const Divide = await ethers.getContractFactory("Divide");

        const hardHatContract = await Divide.deploy();

        let res = await (await hardHatContract.divide()).toNumber() / 10 ** 5;
	expect(res).to.equal(1.5);
	// console.log("this is thre res", res);
    });
});
