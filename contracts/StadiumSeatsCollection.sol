// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StadiumSeatsCollection is ERC721Enumerable, Ownable {

    uint public mintPrice = 0.001 ether; // 0.001 tBNB = 1000000000000000
    uint public maxSupply;
    uint public currentSupply = totalSupply();
    bool public mintActicated;
    string baseURI = 'ipfs://QmcFTHtKB14LAGW6NbZ8jNR6pQGDFPf7dx4SthzPoLpQZb/';
    
    mapping(address => uint) public mintPerWallet;

    constructor() payable ERC721('Stadium Box Seats', 'SEATS') {
        maxSupply = 5;
    } 

    function activeMint() public onlyOwner {
        mintActicated = !mintActicated;
    }
    
    function setMaxSupply(uint _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function mint() external payable {
        require(mintActicated, 'Mint is not activated');
        require(mintPerWallet[msg.sender] < 1, 'You have already minted');
        require(msg.value == mintPrice, 'You pay incorrect amount of money. Pay 0.001 tBNB');
        require(maxSupply > currentSupply, 'This NFT collecction Sold Out');

        mintPerWallet[msg.sender]++;
        currentSupply++;
        uint tokenId = currentSupply;
        _safeMint(msg.sender, tokenId);
    }
}