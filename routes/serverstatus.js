var express = require('express');
var router = express.Router();

router.get('/errorcount',function(req,res){
    res.send({errorcount :0});
})


module.exports = router;