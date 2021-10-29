const bodyparser = require('body-parser');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction
const common = require("ethereumjs-common");
const web31 = new Web3('https://bsc-testnet.web3api.com/v1/QFD3SY2S9A9HG9XK56W3C5UXIJRRWNV25K');
const web3 = new Web3('https://ropsten.infura.io/v3/3e3c4c7cd6b24318b2b25da9e5866632');
const Transaction =require('../models/transaction');


const sendtran =async(req,res)=>{
const ethTousd=4125;
const usdTobnb=0.002;
  const tran={
    fsenderAddress:req.body.fsenderAddress,
    amt:req.body.amt,
    sreceiverAddress:req.body.sreceiverAddress,
    ftxid:"",
    stxid:""
  };
  let UsdValueOfEther=(tran.amt*ethTousd);

try{
  web3.utils.toChecksumAddress(tran.fsenderAddress)
}catch(e){
  return res.status(404).send(e.message);
}
try{
  web3.utils.toChecksumAddress(tran.sreceiverAddress)
}catch(e){
  return res.status(404).send(e.message);
}
web3.eth.getBalance(tran.fsenderAddress,async(err,result)=>{
  if(err){
    console.log(err);
  }else{
  let bal = await web3.utils.fromWei(result,"ether")
  if(bal<tran.amt){
    return res.json("insufficient balance"); 
  }}
})
const pkey1=Buffer.from('3f79b0c05c0ac5d92f388fa251a7cb4988731983d79ee7d1cff1125f38a70571','hex');

web3.eth.getTransactionCount(tran.fsenderAddress, (err, txCount) => {
  const txObject = {
       nonce: web3.utils.toHex(txCount),
       to: "0xc301965D884165b59bd828D0E7634D3cd00A3a5A",
       value: web3.utils.toHex(web3.utils.toWei(tran.amt.toString(), 'ether')),
       gasLimit: web3.utils.toHex(21000),
       gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }
  const tx = new Tx(txObject, { chain: 'ropsten' })
  tx.sign(pkey1)
  const serializedTransaction = tx.serialize()
  const raw = '0x' + serializedTransaction.toString('hex')

 web3.eth.sendSignedTransaction(raw, (err, ftxid) => {
    if(err){
        //console.log(err)
       return res.json(err);
      }else{
       // console.log('txHash eth: ', ftxid)
      }
      tran.ftxid=ftxid;
  }).then()
  .catch((err)=>{
    console.log(err)
  })  
}) 

const pbkey1=Buffer.from('7322d1524553df9756e7fe496ad869bda5fc05b73d7c8d83e716867057eb7bb1','hex');
UsdValueOfBnb=(UsdValueOfEther*usdTobnb);
//console.log(UsdValueOfBnb);
  await web31.eth.getTransactionCount("0xCf5f074579c41EA1205AbF73BA2c807035F7957d", (err, txCount) => {
    
    const txObject = {
         nonce: web31.utils.toHex(txCount),
         to: tran.sreceiverAddress,
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

 web31.eth.sendSignedTransaction(raw, (err, stxid) => {
    if(err){
         console.log(err)
            }else{
            //console.log('txHash bnb: ', stxid)
            tran.stxid=stxid;
    const newtran =new Transaction(tran);
    newtran.save();
    return res.json(newtran);
        }
    })
})

}

module.exports={sendtran};