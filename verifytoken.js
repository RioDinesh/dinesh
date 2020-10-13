const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){

 
    const token=req.header('auth');
 
    if(!token){return res.send('Acess denied')}

    try{

        const verify=jwt.verify(token,process.env.Token);
        req.user=verify;
        next();

    }catch(err){

        res.send('invalid token');
    }




}

