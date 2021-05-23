const Joi = require("joi");

const registerValidation = (register_obj) => {
  const register_schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = register_schema.validate(register_obj);
  return error;
};

const logInValidation = (logInObj) => {
  const logIn_Schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = logIn_Schema.validate(logInObj);
  return error;
};

const registerInstruktorValidation = (register_obj) => {
  const register_schema = Joi.object({ 
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    desc: Joi.string().min(50).max(500).required(),
    phoneNumber: Joi.string()
      .pattern(new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/))
      .min(5)
      .max(30)
      .required(),
    address: Joi.string().max(50).required(),
    city: Joi.string().min(1).max(500).required(),
    zip: Joi.string()
      .pattern(new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/))
      .min(5)
      .max(5)
      .required(),
    tags: Joi.array().items(Joi.string().required()).required(),
    price: Joi.number().min(1).required(),
  });
  const { error } = register_schema.validate(register_obj);
  return error;
};

const userUpdateValidation = (updateObj) => {
  const update_Schema = Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    desc: Joi.string().min(50).max(500),
    city: Joi.string().min(1).max(500),
    phoneNumber: Joi.string()
      .pattern(new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/))
      .min(5)
      .max(30)
      ,
    address: Joi.string().max(50),
    zip: Joi.string()
      .pattern(new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/))
      .min(5)
      .max(5)
      ,
    tags: Joi.array().items(Joi.string()),
    price: Joi.number().min(1),
 
  });
  const { error } = update_Schema.validate(updateObj);
  return error;
};


const instruktorRatingValidaiton = (ratedInstruktor) => {
  const ratin_schema = Joi.object({
    grade: Joi.number().min(1).max(5).required()
  });

  const { error } = ratin_schema.validate(ratedInstruktor);
  return error;
}

const instruktorReviewValidation = (ratedInstruktor) => {
  const review_schema = Joi.object({
    desc: Joi.string().min(5).max(1000).required(),
    param_id:Joi.string().min(24).max(24)
  });

  const { error } = review_schema.validate(ratedInstruktor);
  return error;
}

const searchParamsValidation = (searchParam) =>{
  const search_schema = Joi.object({
    param: Joi.array().items(Joi.string().min(2).max(1000).required()),
    city: Joi.string().min(2).max(100),
    location: Joi.object({
      long:Joi.string().required(),
      lat:Joi.string().required()
    })


  });

  const { error } = search_schema.validate(searchParam);
  return error;
}


module.exports.instruktorReviewValidation = instruktorReviewValidation;
module.exports.instruktorRatingValidaiton = instruktorRatingValidaiton;
module.exports.registerValidation = registerValidation;
module.exports.registerInstruktorValidation = registerInstruktorValidation;
module.exports.logInValidation = logInValidation;
module.exports.userUpdateValidation = userUpdateValidation;
module.exports.searchParamsValidation = searchParamsValidation;
