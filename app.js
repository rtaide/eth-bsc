const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes=require('./routes/routes');
app.use(express.json()) 
app.use(express.urlencoded({extended:true}));

app.use(routes);
mongoose.connect('mongodb://localhost:27017/eth-bsc',{
    useNewUrlParser:true,
    //useCreateIndex:true,                 
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log("err0r while connecting")
})

app.listen(3000,() => {
  console.log("server is running");
});