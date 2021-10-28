const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    
        fsenderAddress:{type:String},
        freceiverAddress:{type:String},
        famt:{type:Number},
        ftxid:{type:String,default:false},
        ssenderAddress:{type:String},
        sreceiverAddress:{type:String},
        samt:{type:Number},
        stxid:{type:String,default:false}
  
});

module.exports = mongoose.model("Transaction", TransactionSchema);

 