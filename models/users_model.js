const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

    let usersSchema = mongoose.Schema(
    {
        first_name:
        {
            type:String,
            required:true,
            minLength:2,
            maxLength:99
        },
        last_name:
        {
            type:String,
            required:true,
            minLength:2,
            maxLength:99
        },
        email:
        {
            type:String,
            required:true,
            minLength:2,
            maxLength:99
        },
        area_code:
        {
            type:String,
            required:true,
            minLength:4,
            maxLength:4
        },
        phone:
        {
            type:String,
            required:true,
            minLength:9,
            maxLength:9,
        }
    })
  
    exports.usersModel = mongoose.model("contacts",usersSchema);
    
    const validUser = (_user) =>
    {
            let JoiSchema = Joi.object(
            {
                id:Joi.string(),
                first_name:Joi.string().min(2).max(99).required(),
                last_name:Joi.string().min(2).max(99).required(),
                email:Joi.string().min(2).max(99).required().email(),
                area_code:Joi.string().min(4).max(4).required(),
                phone:Joi.string().length(9).required(),
            })
    
        return JoiSchema.validate(_user);
    }
    
    exports.validUser = validUser;