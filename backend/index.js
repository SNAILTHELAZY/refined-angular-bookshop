if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const session=require('express-session');
const passport=require('./config/passport');

app.use(bodyParser.urlencoded({limit:'10mb',extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors({credentials:true}));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});
const connection=mongoose.connection;
connection.on('error',error=>console.log(error));
connection.once('open',()=>console.log('Connection established successfully'));

const bookRouter=require('./routes/book');
const userRouter=require('./routes/user');

app.use('/books',bookRouter);
app.use('/users',userRouter);

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}`));