const router=require('express').Router();
const formidable=require('formidable');// used to deal with files
const path=require('path');
const Book=require('../models/books');
const uploadPath=path.join('public',Book.coverImageBasePath);
const options={
    uploadDir:uploadPath,
};
const form=formidable(options);
//return all books to the server if there is no search requirements on the query
router.get('/',(req,res)=>{

});

//create new books from the given body, also it will handle images uploaded
router.post('/new',(req,res)=>{

});

module.exports=router;