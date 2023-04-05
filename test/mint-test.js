const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("StadiumSeatsCollection", function() {
  async function deployTokenFixture() {
    const SeatsContract = await ethers.getContractFactory("StadiumSeatsCollection");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const seatsContract = await SeatsContract.deploy();

    await seatsContract.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { SeatsContract, seatsContract, owner, addr1, addr2 };
  }
    
it('should mint a new NFT when all conditions are met', async () => {
  const { seatsContract, addr1} = await loadFixture(deployTokenFixture);

  await seatsContract.activeMint();

   // Mint a new NFT
   const mintTx = await seatsContract.connect(addr1).mint({ value: ethers.utils.parseEther('0.001') });
   const receipt = await mintTx.wait();
   tokenId = receipt.events[0].args.tokenId.toNumber();

   // Check the token ownership
   expect(await seatsContract.ownerOf(tokenId)).to.equal(addr1.address);
});

it('should not mint a new NFT if minting is not activated', async () => {
  const { seatsContract, addr1} = await loadFixture(deployTokenFixture);

  // Try to mint a new NFT without activating minting
  await expect(seatsContract.connect(addr1).mint({ value: ethers.utils.parseEther('0.001') }))
      .to.be.revertedWith('Mint is not activated');
});

it('should throw an error if incorrect amount of Ether is sent for minting', async () => {
  const { seatsContract, addr1} = await loadFixture(deployTokenFixture);

  // Activate minting
  await seatsContract.activeMint();

  // Attempt to mint with incorrect amount of Ether
  await expect(
    seatsContract.connect(addr1).mint({ value: ethers.utils.parseEther('0.002') })
  ).to.be.revertedWith('You pay incorrect amount of money. Pay 0.001 tBNB');

  // Check that no NFT was minted
  expect(await seatsContract.totalSupply()).to.equal(0);
});
});
  
