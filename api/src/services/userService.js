import * as uuid from 'uuid'
import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import logger from '../utils/logger.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { sendNotFound } from '../helpers/helper.function.js'

dotenv.config()

const user_id=uuid.v4()


export const registerNewUserService=async({firstname,middlename,lastname,email,phone_number,password})=>{
    // logger.info("user details in the service",firstname)
    const hashedPassword=await bcrypt.hash(password, 10)
    try{
        const result=await poolRequest()
        .input('user_id',mssql.VarChar, user_id)
        .input('firstname',mssql.VarChar, firstname)
        .input('middlename',mssql.VarChar,middlename)
        .input('lastname', mssql.VarChar,lastname)
        .input('email',mssql.VarChar, email)
        .input('phone_number', mssql.VarChar,phone_number)
        .input('password', mssql.VarChar,hashedPassword)
        .query(`
            INSERT INTO tbl_users(user_id, firstname, middlename, lastname, email, phone_number,password)
            VALUES(@user_id,@firstname,@middlename,@lastname,@email,@phone_number,@password)        
        
        `)

        return result

    }
    catch(error){
        return error

    }
}

export const getUserByEmailService=async(email)=>{
    try {
         const result=await poolRequest()
         .input('email',mssql.VarChar, email)
         .query(`SELECT * FROM tbl_users WHERE email=@email`)

         return result.recordset

        
    } catch (error) {
        return error
    }
}

export const  getAllUsersService=async()=>{
    try{
        const result =await poolRequest()
        .query(`SELECT * FROM tbl_users`)
        
        return result.recordset

    }
    catch(error){
        return error 
    }
}

export const findByCredentialsService = async (user) => {
    try {
        console.log('user ', user )
        const userFoundResponse = await poolRequest()
            .input('email', mssql.VarChar, user.email)
            .query(` SELECT tbl_users.*
                     FROM tbl_users
                     WHERE tbl_users.email = @email`);

            console.log( "from the user service" ,userFoundResponse.recordset[0])

            if(!userFoundResponse.recordset[0]){return {sendNotFoundResponse :"user not found"}}

        if (userFoundResponse.recordset[0]) {
             if(userFoundResponse.recordset[0].role=='patient'){
                if (await bcrypt.compare(user.password, userFoundResponse.recordset[0].password)) {

                    let token = jwt.sign(
                        {
                            user_id: userFoundResponse.recordset[0].user_id,
                            firstname: userFoundResponse.recordset[0].firstname,
                            email: userFoundResponse.recordset[0].email
                        },
    
                        process.env.SECRET , { expiresIn: "12h" } 
                    );
                   
                    const { password, ...user } = userFoundResponse.recordset[0];
    
                    return { user, token: `JWT ${token}`, message:"Log in as a user" };
                } 
             } 
                 // if there is a password mismatch
            if (await bcrypt.compare(user.password, userFoundResponse.recordset[0].password)==false){return {sendwrongPassword:'wrong password'}}
           
            if (userFoundResponse.recordset[0].role=='admin'){

                if (await bcrypt.compare(user.password, userFoundResponse.recordset[0].password)){
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
                return { user, token: `JWT ${token}` ,message:"log in as an admin"}};
            }



        } else {
            return { error: 'Invalid Credentials' };
        }

    } catch (error) {
        return error;
    }

}