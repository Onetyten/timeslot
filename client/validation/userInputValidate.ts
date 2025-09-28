import Joi from "joi"

export const signupSchema = Joi.object({
    name:Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required()
})

export const signinSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required()
})

export const slotJoiSchema = Joi.object({
    name :Joi.string().required(),
    email: Joi.when('type', {
        is: 'birthday',
        then: Joi.string().email().required(),
        otherwise: Joi.string().optional().allow("")
    }),
    type: Joi.string().valid('birthday','event').required(),
    eventDate: Joi.date().greater('now').required(),
    relationship:Joi.string().optional().allow("")
})
