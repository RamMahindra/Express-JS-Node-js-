var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var myschema = mongoose.Schema({
    name:String,
    pl:String
});

var Choicemodel = mongoose.model('choices',myschema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',bod:'you are' });
});

router.get('/rapid',function(req,res){
    var str = {name:"ram",occ :"mts"};
    res.send(str);
});

router.get('/rapid/:name/:pl',function(req,res){
    var name = req.params.name;
    var pl = req.params.pl;
    var newchoice = new Choicemodel();
    newchoice.name = name;
    newchoice.pl = pl;
    newchoice.save(function(err,savedObject)
                  {
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.send(savedObject);
        }
            
    });
    //res.send("Hey "+name +"! Do you come from "+pl);
})

router.get('/likes',function(req,res){
    var logvalue = req.headers['log'];
    if(logvalue && logvalue == 'info'){
        console.log("Request recieved for /likes");
    }
    
    var daba = [];
    var select = req.query.select;
    
    Choicemodel.find({},function(err,founddata){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(founddata.length == 0){
                var responseobject = undefined;
                if(select && select == 'count'){
                    responseobject ={count:0};
                res.status(404).send(responseobject);
                    
                }
            }
            else{
                res.send(founddata);
        }
            
        }
        
    });
    
})

module.exports = router;
