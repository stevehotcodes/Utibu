import { dataFethched, sendBadRequest, sendNotFound, sendServerError, sendSuccess } from "../helpers/helper.function.js"
import { findByCredentialsService, getAllUsersService, getUserByEmailService, registerNewUserService } from "../services/userService.js"
import logger from "../utils/logger.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'





export const registerNewUser=async(req,res)=>{
    try {
        const{firstname,middlename,lastname,email,phone_number,password}=req.body
        const user=await getUserByEmailService(email)

        if(user[0]){
            logger.info('there is an existing account associated with that email', user[0])
            sendBadRequest(res, 'there is an existing account associated with that email')
        }
        else{
            logger.info(req.body)
            const response=await registerNewUserService({firstname,middlename,lastname,email,phone_number,password})
            logger.info("response from the server", response)
            if(response.rowsAffected>0){
                sendSuccess(res, "User registered succcessfully")
            }
            else{
                sendServerError(res, "Error in registering the user")
            }
          
        }
        

        
    } catch (error) {
        sendServerError(res, error.message)
    }
}

// get all patients records
export const getAllUsers=async(req,res)=>{
    try {
         const users=await getAllUsersService()
         if(users.length){
            dataFethched(res,users)
         }
         else{
            sendNotFound(res, `no users' records found`)
         }
        
    } catch (error) {
        sendServerError(res,error.message)
    }
}



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    
        try {
            const userResponse = await findByCredentialsService({ email, password });
            console.log(userResponse)
              console.log(userResponse)
            //   return   res.status(200).send(userResponse);
                console.log(userResponse)
               return  res.status(200).json({user:userResponse.user, token:userResponse.token});

            
        } catch (error) {
            sendServerError(res, error.message)
        }
    
};