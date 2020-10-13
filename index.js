const dotenv=require('dotenv');
dotenv.config();
// server init
const epxress =require('express');
const server=epxress();
const port=2000;

server.listen(port,(err)=>{

    if(err){
        console.log('error something went wrong');
    }

    console.log('server started in',port);
});

//middleware
server.use(epxress.json());

//routing
const router=require('./routes/routes');

server.use('/user',router);
server.use('/user/get',router);


//database connection

const mongoose=require('mongoose');

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);

mongoose.connect(process.env.DB,(err)=>{
    if(err){
        console.log('cannot connect database');
    }
    console.log('connected to  db');
});
