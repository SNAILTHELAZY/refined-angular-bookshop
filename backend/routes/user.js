const passport = require('passport');
const User = require('../models/user');

const router=require('express').Router();

router.post('/register',async(req,res)=>{
    console.log(req.body);
    const user=new User({
        username:req.body.username,
        password:req.body.password,
    });
    try{
        const newUser=await User.create(user);
        res.status(201).send(newUser);
    }catch(err){
        console.error(err);
        res.status(500).send({message:"unknown error"});
    }
});

router.post('/login',passport.authenticate('local'),(req,res)=>{
    if(req.user);
        res.status(200).send(req.user);
});

router.post('/logout',(req,res)=>{
    req.logout();
    res.status(200).json({user:req.user});
})

router.get('/',async(req,res)=>{
    req.user ? res.status(200).json({isAuth:true}) : res.status(200).json({isAuth:false});
    /*
    try{
        const users=await User.find();
        res.status(200).send(users);
    }catch{
        res.status(500).send({message:'unknown server error'});
    }
    */
})

module.exports=router;