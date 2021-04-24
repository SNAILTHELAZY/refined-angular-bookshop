const router=require('express').Router();
const formidable=require('formidable');// used to deal with files
const path=require('path');
const Book=require('../models/book');
const bookCoverPath=path.join('public','bookCovers');
const fs=require('fs');

//return all books to the server if there is no search requirements on the query
router.get('/',async(req,res)=>{
    try{
        if(req.query.keyword){
            const books=await Book.find({
                $or:[
                    {title:{$regex:new RegExp(req.query.keyword,'i')}},
                    {author:{$regex:new RegExp(req.query.keyword,'i')}},
                    {genre:{$regex:new RegExp(req.query.keyword,'i')}}
                ]
            });
            res.status(200).send(books);    
        }else{
            const books=await Book.find();
            res.status(200).send(books);
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:'unknown error'});
    }
});

//get image
router.get('/image/:cover',async(req,res)=>{
    var filename=req.params.cover;
    filename=path.join(__dirname.slice(0,__dirname.indexOf('routes')-1),bookCoverPath,filename);
    //console.log(filename);
    try{
        await res.sendFile(filename);
    }catch(err){
        //console.log(err);
        res.status(500).send({message:'unknown error occur, unable to get image'});
    }
});

//create new books from the given body, also it will handle images uploaded
router.post('/new',(req,res)=>{
    const form=new formidable.IncomingForm();
    form.parse(req,async(err,fields,files)=>{
        if(err){
            res.status(500).send({message:'unknwon error occur, unable to receive data'});
        }

        const book_convert=JSON.parse(fields.book);
        const book=new Book(book_convert);

        //console.log(book);
        try{

            if(Object.keys(files).length!=0){
                //console.log(files);
                var oldPath=files.cover.path;
                var filename=files.cover.name;
                filename=filename.split('.');
                filename[0]=book_convert.title;
    
                var rename=filename[0].concat('.',filename[1]);
                var newPath=path.join(bookCoverPath,rename);
    
                var raw=fs.readFileSync(oldPath);
                fs.writeFileSync(newPath,raw);
                book.cover=rename;
                //console.log(finished);
                //res.status(500).send({message:'cannot save image'});
                
            }

            const newBook=await book.save();
            const books=await Book.find();
            res.status(201).send({books:books,message:'book created'});
        }catch(err){
            console.log(err)
            res.status(500).send({message:'unknown error occur, unable to create book'});
        }
    })
});

router.put('/:id',(req,res)=>{
    const form=new formidable.IncomingForm();
    form.parse(req,async(err,fields,files)=>{
        if(err){
            res.status(500).send({message:'unknwon error occur, unable to receive data'});
        }

        const book=JSON.parse(fields.book);

        //console.log(book);
        try{

            if(Object.keys(files).length!=0){
                //console.log(files);
                var oldPath=files.cover.path;
                var filename=files.cover.name;
                filename=filename.split('.');
                filename[0]=book.title;
    
                var rename=filename[0].concat('.',filename[1]);
                var newPath=path.join(bookCoverPath,rename);
    
                var raw=fs.readFileSync(oldPath);
                fs.writeFileSync(newPath,raw);
                //console.log(finished);
                //res.status(500).send({message:'cannot save image'});
                
            }
            
            await Book.findByIdAndUpdate(req.params.id,book);
            const books=await Book.find();
            res.status(200).send({books:books,message:'book updated'});
        }catch(err){
            console.log(err)
            res.status(500).send({message:'unknown error occur, unable to update data'});
        }
    })
});

router.delete('/:id',async(req,res)=>{
    try{
        const delBook=await Book.findByIdAndDelete(req.params.id);
        if(delBook.cover!=''){
            const delPath=path.join(bookCoverPath,delBook.cover);
            fs.unlinkSync(delPath);
        }
        const books=await Book.find();
        res.status(200).send({books:books,message:'book delete successful'});
    }catch(err){
        //console.log(err)
        res.status(500).send({message:'unknown error occur, unable to delete data'});
    }
});

module.exports=router;