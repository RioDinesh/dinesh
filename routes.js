// router import

const router=require('express').Router();
const {registerv}=require('../validation')
const model=require('../model/model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
//register and validation of user

router.post('/register',async(req,res)=>{
//validating
const{error}=registerv(req.body)
if(error) {return res.json({

   status:'error',
   error:error.details[0].message


});

}

//checking email exists
const emailexist=await model.findOne({email:req.body.email});
if(emailexist){
   return res.send('email is alredy there');

}
// name exists
const nameexist=await model.findOne({name:req.body.name});
if(nameexist){
   return res.send('username is already there ');

}

//hashing the password
const salt= await bcrypt.genSalt(10)
const hashpass=await bcrypt.hash(req.body.password,salt);

//saving the user
const user= new model({
    name:req.body.name,
    email:req.body.email,
    password:hashpass

});
try{

    const saveuser= await user.save();
      res.json({
          status:'created',
          data:saveuser
      });


}catch(err){

    res.json({
        status:'error',
        message:err
    });

}


});

//login 
router.post('/login',async(req,res)=>{
//checking the email
const user=await model.findOne({email:req.body.email});
if(!user){
   return res.send('invaild email');
}

//checking the password
const pass=await bcrypt.compare(req.body.password,user.password);
if(!pass){
    return res.send('invaild password');
}


//create a token 

const token =jwt.sign({_id:user.id},process.env.Token)
res.header('auth',token).send(token);

res.send('logged in');

});

// get

const auth=require('./verifytoken');
router.get('/get',auth,(req,res)=>{

    res.send("hello")

});



module.exports=router;