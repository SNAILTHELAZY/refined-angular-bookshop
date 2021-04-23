const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    publishDate:{
        type:Date,
        default:Date.now(),
    },
    pages:{
        type:Number,
    },
    //store the cover image within the public folder, while this is just store the path
    cover:{
        type:String,
    }
})

module.exports=mongoose.model('Book',bookSchema);