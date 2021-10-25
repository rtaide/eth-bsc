const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction
const common = require("ethereumjs-common");
const web31 = new Web3('https://bsc-testnet.web3api.com/v1/QFD3SY2S9A9HG9XK56W3C5UXIJRRWNV25K');
const web3 = new Web3('https://ropsten.infura.io/v3/3e3c4c7cd6b24318b2b25da9e5866632');


const ethTousd=4125;
//const usdToeth=0.00024;

//const bnbTousd=482;
const usdTobnb=0.002;
let UsdValueOfEther;
     
async function transfer(amt){

UsdValueOfEther=(amt*ethTousd);
console.log(UsdValueOfEther.toFixed(4))

let UsdValueOfBnb=UsdValueOfEther*usdTobnb;
console.log(UsdValueOfBnb.toFixed(4));


const acc1='0x8e8302EaD9014d80D6F493fBA40d14147009E55B';
const acc2='0xc301965D884165b59bd828D0E7634D3cd00A3a5A';

const pkey1=Buffer.from('3f79b0c05c0ac5d92f388fa251a7cb4988731983d79ee7d1cff1125f38a70571','hex');


web3.eth.getTransactionCount(acc1, (err, txCount) => {

    const txObject = {
         nonce: web3.utils.toHex(txCount),
         to: acc2,
         value: web3.utils.toHex(web3.utils.toWei(amt.toString(), 'ether')),
         gasLimit: web3.utils.toHex(21000),
         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx(txObject, { chain: 'ropsten' })
tx.sign(pkey1)
const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  if(err){
    console.log(err)
  }else{
    console.log('txHash eth: ', txHash)
  }
 })
}) 
const bnb1='0xCf5f074579c41EA1205AbF73BA2c807035F7957d';
  const bnb2="0x9153BCE05d0fb5C1b11030ACfA5E8372b54d20CF";
  
  const pbkey1=Buffer.from('7322d1524553df9756e7fe496ad869bda5fc05b73d7c8d83e716867057eb7bb1','hex');
 
  await web31.eth.getTransactionCount(bnb1, (err, txCount) => {
    
    const txObject = {
         nonce: web31.utils.toHex(txCount),
         to: bnb2,
         value: web31.utils.toHex(web31.utils.toWei(UsdValueOfBnb.toString(), 'ether')),
         gasLimit: web31.utils.toHex(21000),
         gasPrice: web31.utils.toHex(web31.utils.toWei('20', 'gwei'))
    }
    const chain = common.default.forCustomChain(
        'mainnet', { 
        name: 'bnb',
        networkId: 97,
        chainId: 97
    },
        'petersburg'
    );


const tx = new Tx(txObject, { common:chain })
tx.sign(pbkey1)
const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')

web31.eth.sendSignedTransaction(raw, (err, txHash) => {
  if(err){
    console.log(err)
  }else{
    console.log('txHash bnb: ', txHash)
  }
 })
})

}

transfer(0.1)
