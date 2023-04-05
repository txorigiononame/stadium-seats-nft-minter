async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const SeatsNFTC = await ethers.getContractFactory("StadiumSeatsCollection"); //Replace with name of your smart contract
  const StadiumSeatsCollection = await SeatsNFTC.deploy();

  console.log("Stadium Seats Collection:", StadiumSeatsCollection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
