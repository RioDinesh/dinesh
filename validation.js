const joi= require('@hapi/joi');

const registerv=(data)=>{

const schema={

    name: joi.string()
    .min(5)
    .required(),
    email:joi.string()
    .min(5)
    .required(),
    password:joi.string()
    .min(5)
    .required(),
    
};

return joi.validate(data,schema);


};

module.exports.registerv=registerv;