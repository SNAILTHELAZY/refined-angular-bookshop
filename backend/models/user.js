const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRounds=10;

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});

userSchema.methods.validatePassword=async(password)=>{
    try{
        const result=await bcrypt.compare(password,this.password);
        return result;
    }catch{
        return false;
    }
};

userSchema.post('save',async function(next){
    try{
        const salt=await bcrypt.genSalt(saltRounds);
        //console.log(this.password);
        this.password=await bcrypt.hash(this.password,salt);
        //next();
    }catch(err){
        //console.error(err);
        console.error('cannot encrypt password');
    }
})

module.exports=mongoose.model('User',userSchema);