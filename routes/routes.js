var express=require('express');
const {sendtran}=require('../controllers/sendTransaction');
var router =express.Router();

router.post('/transaction',sendtran);

module.exports=router;