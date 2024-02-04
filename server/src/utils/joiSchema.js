import Joi from "joi"

export const getErrormessage = (error) =>{
   return error ? error?.details?.[0]?.message : ''
}


export const loginSchema = Joi.isSchema({
   email : Joi.string().email().required().messages({
      'any.required':'email is required',
      'string.email':'Please make sure to provide a valid email'
   }),
   password:Joi.string()
})

export const createUserSchema = Joi.object({
   name:Joi.string().min(2).max(16).required().messages({
    'any.required':"name is a required field",
    'string.min':`name should have a minimum length of {#limit}`,
    'string.max':`name should have a maximum length of {#limit}`
   }),
   email:Joi.string().email().required().messages({
    'any.required':`email is a required field`,
    'string.email':"Please make sure to provide  a valid email"
   }),
   password:Joi.string().required().min(6).max(128).messages({
    'any.required':'Password is a required field',
    'string.max':'Please make sure you password should not exceed 128 characters',
    'string.min':'Please make sure you password is not less than 6 characters'
   }),
   picture:Joi.string().allow("",null),
   status: Joi.string().max(64).messages({
    'string.max':'Please make sure your status is less than 64 characters'
   }).allow("",null),
}) 