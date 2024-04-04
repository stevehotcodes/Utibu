import joi from 'joi'


export const userRegistrationValidator=(user)=>{
    const userRegistrationSchema=joi.object({
        firstname:joi.string().required().min(3),
        middlename:joi.string().required().min(1),
        lastname:joi.string().required().min(1),
        email:joi.string().required().email(),
        phone_number:joi.string().required().min(10),
        password:joi.string().required().min(4)
    })

    return userRegistrationSchema.validate(user)
   
}

export const userLoginValidator=({email,password})=>{

    const userSchema=joi.object({
        
        email:joi.string().required(),
        password:joi.string().required(),
           
    })
    return userSchema.validate({email,password});
}