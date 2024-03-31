import * as uuid from 'uuid'
import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import logger from '../utils/logger.js'



const user_id=uuid.v4()


export const registerNewUserService=async({firstname,middlename,lastname,email,phone_number,password})=>{
    logger.info("user details in the service",firstname)
    try{
        const result=await poolRequest()
        .input('user_id',mssql.VarChar, user_id)
        .input('firstname',mssql.VarChar, firstname)
        .input('middlename',mssql.VarChar,middlename)
        .input('lastname', mssql.VarChar,lastname)
        .input('email',mssql.VarChar, email)
        .input('phone_number', mssql.VarChar,phone_number)
        .input('password', mssql.VarChar,password)
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