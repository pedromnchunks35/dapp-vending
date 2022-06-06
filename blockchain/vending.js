/* ABI */
const _abi= [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getmyownbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"thebalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
/* FUNCTION TO RETURN THE CONTRACT WHICH YOU PASS YOUR PROVIDER _WEB3 (METAMASK),THE ABI AND THE CONTRACT ADDRESS */ 
const _vendingMachineContract = _web3 =>{
return new _web3.eth.Contract(
    _abi,
    "0xdFD929b814739ed218c5bc5BB24737ff649bc9B3"
    );
}


/* EXPORT IT */
export default _vendingMachineContract;