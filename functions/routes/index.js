var express = require('express');
var router=express.Router();

router.get('/index',function(req,res){
    res.render('index');
})
router.get('/register',function(req,res){
    res.render('register');
})
router.get('/login',function(req,res){
    res.render('login');
})
router.get('/forgot-password',function(req,res){
    res.render('forgot-password');
})

module.exports=router;

