const passport=require('passport'),LocalStrategy=require('passport-local').Strategy;
const user = require('../models/user');
const User=require('../models/user');

passport.use(new LocalStrategy(async(username,password,done)=>{
    try{
        const user=await User.findOne({username:username});
        if(!user){
            return done(null,false,{message:'invalid username'});
        }
        if(!user.validatePassword(password)){
            return done(null,false,{message:'incorrect password'});
        }
        return done(null,user);
    }catch(err){
        return done(err);
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser(async(id,done)=>{
    try{
        const user=await User.findById(id);
        done(null,user);
    }catch(err){
        done(err);
    }
});

module.exports=passport;