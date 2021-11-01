const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  
        ethTransaction:{
                amt:{type:Number},
                fsenderAddress:{type:String},
                ftxid:{type:String,default:false}},
        bnbTransaction:{
                sreceiverAddress:{type:String},
                stxid:{type:String,default:false}}
        //stxid:String
        /*ethTransaction:{
                fsenderAddress:{type:String},
                amt:{type:Number},
                ftxid:{type:String,default:false}

        },
        bnbTransaction:{
                sreceiverAddress:{type:String},
                stxid:{type:String,default:false}
        }*/
  
});

module.exports = mongoose.model("Transaction", TransactionSchema);

 