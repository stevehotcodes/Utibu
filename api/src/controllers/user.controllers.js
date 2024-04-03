import { dataFethched, sendBadRequest, sendNotFound, sendServerError, sendSuccess } from "../helpers/helper.function.js"
import { getAllUsersService, getUserByEmailService, registerNewUserService } from "../services/userService.js"
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

export const findByCredentialsService = async (user) => {
    try {
        const userFoundResponse = await poolRequest()
            .input('email', mssql.VarChar, user.email)
            .query(` SELECT tbl_user.*
                     FROM tbl_user
                                   
                     WHERE tbl_user.email = @email`);
            console.log(userFoundResponse)
        if (userFoundResponse.recordset[0]) {


            if (await bcrypt.compare(user.password, userFoundResponse.recordset[0].password)) {

                let token = jwt.sign(
                    {
                        user_id: userFoundResponse.recordset[0].user_id,
                        firstname: userFoundResponse.recordset[0].firstname,
                        email: userFoundResponse.recordset[0].email
                    },

                    process.env.SECRET, { expiresIn: "12h" } 
                );
                const { password, ...user } = userFoundResponse.recordset[0];
                console.log('user details:',user)
                return { user, token: `JWT ${token}` };
            } 
            if (userFoundResponse.recordset[0].role=='admin'){
                let token = jwt.sign(
                    {
                        user_id: userFoundResponse.recordset[0].user_id,
                        firstname: userFoundResponse.recordset[0].firstname,
                        email: userFoundResponse.recordset[0].email
                    },

                    process.env.SECRET, { expiresIn: "12h" } 
                );
                const { password, ...user } = userFoundResponse.recordset[0];
                console.log('user details:',user)
                return { user, token: `JWT ${token}` };

            }


        } else {
            return { error: 'Invalid Credentials' };
        }

    } catch (error) {
        return error;
    }

}

