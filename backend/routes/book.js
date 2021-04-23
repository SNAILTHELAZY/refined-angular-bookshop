const router=require('express').Router();
const formidable=require('formidable');// used to deal with files
const path=require('path');
const Book=require('../models/book');
const bookCoverPath=path.join('public','bookCovers');
const fs=require('fs');

//return all books to the server if there is no search requirements on the query
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find();
        res.status(200).send(books);
    }catch(err){
        console.log(err);
        res.status(500).send({message:'unknown error'});
    }
});

//create new books from the given body, also it will handle images uploaded
router.post('/new',(req,res)=>{
    const form=new formidable.IncomingForm();
    form.parse(req,async(err,fields,files)=>{
        if(err){
            res.status(500).send({message:'unknwon error'});
        }

        const book_convert=JSON.parse(fields.book);
        const book=new Book(book_convert);

        //console.log(book);
        try{

            if(files){
                //console.log(files);
                var oldPath=files.cover.path;
                var filename=files.cover.name;
                filename=filename.split('.');
                filename[0]=book_convert.title;
    
                var rename=filename[0].concat('.',filename[1]);
                var newPath=path.join(bookCoverPath,rename);
    
                var raw=fs.readFileSync(oldPath);
                fs.writeFileSync(newPath,raw);
                //console.log(finished);
                //res.status(500).send({message:'cannot save image'});
                
            }

            const newBook=await book.save();
            res.status(201).send({message:'book created'});
        }catch(err){
            console.log(err)
            res.status(500).send(err);
        }
    })
});

router.put('/:id',(req,res)=>{

});

router.delete('/:id',(req,res)=>{

});

module.exports=router;