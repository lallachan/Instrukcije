const Joi = require("joi");

 const registerValidation  = (register_obj)=>{
    const register_schema = Joi.object({
        firstName: Joi.string()
        .min(2)
        .required(),
        lastName:Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });

      const {error} = register_schema.validate(register_obj);
      return error;
}


 const logInValidation  = (logInObj)=>{
    const logIn_Schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });

      const {error} = logIn_Schema.validate(logInObj);
      return error;
}

module.exports.registerValidation = registerValidation
module.exports.logInValidation = logInValidation
