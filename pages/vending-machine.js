/* IMPORT CONTRACT ITSELF */
import _vendingMachineContract from '../blockchain/vending';
/* IMPORT USESTATE */
import { useState,useEffect } from 'react';
/* IMPORT WEB3 library */
import Web3 from 'web3';
/* import head component react (it is inside node modules , next.js things) */
import Head from 'next/head'
/* IMPORT CSS */
import 'bulma/css/bulma.css';
import styles from '../styles/VendingMachine.module.css';
/* HOOK */
const VendingMachine= () => {
    /* USESTATE FOR ERROR */
    const[error,setError] = useState('');
    /* USETATE FOR INVENTORY OF THE VENDING MACHINE */
    const[inventory,setInventory]= useState('');
    /* USE STATE FOR CLIENT BALANCE */
    const[donuts_balance,setDonuts_balance]=useState('');
    /* BUY COUNT */
    const[buyCount,setBuyCount]=useState('');
    /* WEB3 OBJECT */
    const[_web3,setWeb3]=useState(null);
    /* Account variable */
    const[_account,setAccount]=useState(null);
    /* CONTRACT ITSELF */
    const[_vmContract,setvmContract]=useState(null);

    /* USE EFFECT, BASICLY RENDERS ONLY WHAT AS CHANGED */
    useEffect(()=>{
    /* FUNCTION RESPOSIBLE FOR THE CHANGES */
    /* VENDING MACHINE INVENTORY */
    /* WE ONLY CAN IVOKE THOSE FUNCTIONS IF THE USER CLICKS ON THE CONNECT WALLET BUTTON BECAUSE IT IS WHERE HE LOADS THE CONTRACT AND THE ACCOUNT */
    if(_vmContract!=null)getInventoryHandler();
    /* CLIENT ITSELF BALANCE OF DONUTS */
    if(_vmContract!=null && _account!=null)clientInventoryHandler();
    //only update if this variables change
    },[_vmContract,_account]);
    /* FUNCTION TO SET THE ACCOUNT */
     const setAccountFinal = async __web3 =>{
        /* GET ALL ACCOUNTS */
        const accounts=await __web3.eth.getAccounts();
        /* SET THE ACCOUNT */
        setAccount(accounts[0]);
     }
     /* **HANDLERS** */

    /* FUNCTION TO CONNECT THE WALLET IN THE BUTTON CLICK */
    /* WE WILL MAKE IT ASYNC SO WE WAIT TILL THE ALL EXECUTION */ 
    const _connectWallet = async () =>{
    /* DETECT IF THE USER WAS METAMASK */
    if(typeof window !== 'undefined' && typeof window.ethereum !== "undefined"){
    /* A TRY CATCH SIMPLY BECAUSE IT CAN OCCOUR ERROS LIKE USER REJECTING THE CONNECTION OR SOMETHING ALIKE */    
    try{
    /* IF THE USER WAS METAMASK WE ASK FOR CONNECTION */
    window.ethereum.request({method: "eth_requestAccounts"});
    /* get instance so we can invoke methods from our smart contract */
    var __web3 =new Web3(window.ethereum); 
    /* SET WEB3 */
    setWeb3(__web3);
    /* CREATE LOCAL CONTRACT COPY */
    const _vm = _vendingMachineContract(__web3);
    /* SET VM */
    setvmContract(_vm);
    /* SET THE ACCOUNT */
    await setAccountFinal(__web3);

    }catch (error) {
    /* SET ERROR FUNCTION WHICH WAS SETTED BY USESTATE TO CHANGE ERROR VAR */
    setError(error.message);
    }
    }else{
    alert("You need metamask to persue this operation");
    }

    }

    /* INVENTORYHANDLER(it needs to be async) */
    const getInventoryHandler =  async () => {
     /* INVOKE THE METHOD (this function is a reader) , an write function is different*/
     /* DONT FORGET THE AWAIT KEYWORD */
     const _inventory = await _vmContract.methods.getVendingMachineBalance().call();
     /* SET INVENTORY */
     setInventory(_inventory);
    }

    /* CLIENT INVENTORY HANDLER */
    const clientInventoryHandler =  async () => {
        /* INVOKE THE METHOD (this function is a reader) , an write function is different*/
        /* DONT FORGET THE AWAIT KEYWORD */
        /*METHOD TO CHECK BALANCE OF GIVEN ACCOUNT*/
        const count = await _vmContract.methods.thebalance(_account).call();
        /* SET THE RESULT */
        setDonuts_balance(count);
       }
    /*Buy Douts*/
    const buyDonuts = async ()=>{

        try {
        const __account =await _web3.eth.getAccounts(); 
        /* SEND WEI FOR PURCHASE */
        await _vmContract.methods.purchase(buyCount).send({from:await __account[0] , value: Web3.utils.toWei('2','ether')*buyCount});
        /* UPDATE THE BALANCE */
        clientInventoryHandler();
        getInventoryHandler();
        } catch (error) {
        console.log(_account);
        console.log(await _web3.eth.getAccounts());
        }
     
    }
    /* QTY OF DONUTS TO BUY */
    const updateDonutQty = event =>{
        //SET THE VALUE
        setBuyCount(event.target.value);
    }


    /* return statement */
    return(
        /* PRINCIPAL DIV */
        <div className={styles.main}>
        {/* HEAD COMPONENT */}
        <Head>
        {/* SETTING THE TITLE */}
        <title>VendingMachine App</title>
        {/* SETTING CONTENT DESCRIPTION */}
        <meta name="description" content="An blockchain vending App" />
        
        </Head>
        {/* NAVBAR */}
        <nav className="navbar mt-4 mb-4">
        {/* AN CONTAINER WITH AN CLASS PROVIDED BY BULMA FRAMEWORK */}
        <div className='container'>
        {/* ANOTHER DIV INSIDE THE NAVBAR DIV */}
        <div className='navbar-brand'>
        {/* AN TITLE */}
        <h1>Vending Machine</h1>
        </div>
        {/* END NAVBAR DIV , SECOUND ONE INSIDE NAVBAR DIV (it was setting to be at the final of the navbar)*/}
        <div className='navbar-end'>
        {/* AN BUTTON WITH A COLOR GIVEN BY BLUMA */}
        <button className='button is-primary' onClick={_connectWallet}>Connect Wallet</button>
        </div> 

        </div>
        </nav>


        {/* SECTION */}
        <section>
        {/* SECTION CONTAINER (BELLOW NAV) */}
        <div className='container'>
        {/* Inventory stats of the vending machine*/}
        <h2>Vending machine inventory: {inventory}</h2>   
        </div>
        </section>


        {/* SECTION */}
        <section>
        {/* SECTION CONTAINER (BELLOW NAV) */}
        <div className='container'>
        {/* PARAGRAPH */}
        <h2>My Donuts balance: {donuts_balance} </h2>    
        </div>
        </section>



         {/* SECTION */}
         <section className='mt-5'>
        {/* SECTION CONTAINER (BELLOW NAV) */}
        <div className='container'>
        {/* DIV FIELD */}
        <div className='field'>
        {/* Label */}
        <label className='label'>Buy Donuts</label>
        {/* DIV CONTROLER TYPE */}
        <div className='control'>
        {/* INPUT BOX */}
        <input className='input' onChange={updateDonutQty} type={"text"} placeholder="Enter the Amount"/>
        </div>
        <button onClick={buyDonuts} className="button is-primary mt-2">Buy</button>
        </div>
        </div>
        </section>




        {/* SECTION */}
        <section>
        {/* SECTION CONTAINER (BELLOW NAV) */}
        <div className='container has-text-danger'>
        {/* PARAGRAPH */}
        <p>{error}</p>    
        </div>
        </section>




        </div>
        
    )
}
/* FUNCTION EXPORT */
export default VendingMachine;