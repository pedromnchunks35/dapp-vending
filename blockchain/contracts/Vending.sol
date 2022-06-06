

/*
Solidity function composition

function <func_name> (<param_type> , <param_name>) visibility <state mutability> <returns <return_type>>{}


VISIBILITY:
private - only visible in the current contract
internal- can be called by the current contract or any derived contracts
external- only visible externally , however can be acessed within the current contract via 'this.func'
public- (default) visible externally and internally

STATE MUTABILITY:
view: Functions declared with view can read state but not modify it
pure: Functions can neither read or modify state
payable: Functions declared with payable can accept ether sent to the contract. If a function doesnt take this keyword it will by default reject the ether sended.
*/

/*
VENDING MACHINE
State variables: owner , balances
Functions: purchase , restock , get balance
constructor: set owner, set initial balance of vending machine
*/
pragma solidity ^0.8.7;
contract Donutvending{
//declare the state variables
 address public owner;
 mapping (address => uint)internal donutBalances;


//constructor
constructor(){
//sender is the deployer of the contract
owner=msg.sender;
//address of the current contract
donutBalances[address(this)] = 100;
}

/*FUNCTIONS*/
//get current balance of donuts
function getVendingMachineBalance() public view returns(uint){
//return balance
return donutBalances[address(this)];
}


//it will change data so , theres no keyword afterwards
function restock(uint amount)public{
    //lets supose we only want the owner to restock it, in order to do that we will apply an require
    //sender in the contructor is the contract deployer but here it could not
    require(msg.sender == owner,"Only the owner can restock this machine");
donutBalances[address(this)] += amount;
}


//this func is payable because we need to receive ether
function purchase(uint amount) public payable {
//require for the value is enough and also balance of donuts in the machine is enought
require(msg.value >= amount * /*donut price*/ 2 ether,"You must pay atleast 2 ether per donut");
require(donutBalances[address(this)]>=amount,"Not enough donuts in stock to fullfill purchase request");
//update the balance
donutBalances[address(this)] -= amount;
//update the sender balance
donutBalances[msg.sender] += amount;
}

//funcao para retornar o balanco
function thebalance(address _address) public view returns(uint){
return donutBalances[_address];
}
//funcao para retornar proprio balanco
function getmyownbalance() public view returns(uint){
    return donutBalances[msg.sender];
}


}