const Tx = require('ethereumjs-tx').Transaction
const common = require("ethereumjs-common");
const Web3 = require('web3');
const web3 = new Web3('https://bsc-testnet.web3api.com/v1/QFD3SY2S9A9HG9XK56W3C5UXIJRRWNV25K');
/*const ha='0x9153BCE05d0fb5C1b11030ACfA5E8372b54d20CF';
web3.eth.getBalance(ha).then(console.log);*/


//const acc1='0x9153BCE05d0fb5C1b11030ACfA5E8372b54d20CF';
  const acc1='0xc301965D884165b59bd828D0E7634D3cd00A3a5A';
  const acc2="0x3fc14Fb8Ac663aA6438aB42a8c60981Fc00c2a8D";
  //const acc2='0xCf5f074579c41EA1205AbF73BA2c807035F7957d';

  //const pkey1=Buffer.from('b4ad825f43f2631c9d3245334295d7124e2b565541d7d21c3d78c422d05267b7','hex');
  const pkey1=Buffer.from('47068e3a7895e700d25f6431052eb5ea71386684edf550b7513361a9b612eba8','hex');
 

  web3.eth.getTransactionCount(acc1, (err, txCount) => {

    const txObject = {
         nonce: web3.utils.toHex(txCount),
         to: acc2,
         value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
         gasLimit: web3.utils.toHex(21000),
         gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
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
tx.sign(pkey1)
const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  if(err){
    console.log(err)
  }else{
    console.log('txHash: ', txHash)
  }
 })
})