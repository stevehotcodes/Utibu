import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import * as uuid from 'uuid'



export const createCartService=async({product_id, quantity,user_id})=>{
    try {
           const cart_id=uuid.v4()
           const result= await poolRequest()
           .input('cart_id' , mssql.VarChar, cart_id)
           .input('product_id', mssql.VarChar, product_id)
           .input('quantity', mssql.Int, quantity)
           .input('user_id', mssql.VarChar,user_id)
           .query(`INSERT INTO cart (cart_id, product_id, quantity, user_id)
           VALUES (@cart_id, @product_id, @quantity, @user_id)`)
           
           return result.rowsAffected
        
    } catch (error) {
        return error
    }
}

export const removeItemFromCartService=async(cart_id)=>{
    try {
           const result =await poolRequest()
           .input('cart_id', mssql.VarChar,cart_id)
           .query(
                  `DELETE FROM cart WHERE cart_id=@cart_id`

           )
        
    } catch (error) {
        return error
    }
}

export const getCartService=async(user_id)=>{
    try {

        const result=await poolRequest()
        .input('user_id', mssql.VarChar, user_id)
        .query(`SELECT c.cart_id, c.product_id, c.quantity, c.user_id, p.product_name, p.price
        FROM cart AS c
        LEFT JOIN
        tbl_medical_products AS p
        ON c.product_id=p.product_id
        WHERE c.user_id=@user_id`)

        return result.recordset
        
    } catch (error) {
        return error
    }
}

export const createNewMedicalOrderService=async(user_id,order_id)=>{
    try {
       
        const result=await poolRequest()
        .input('user_id', mssql.VarChar, user_id)
        .input('order_id', mssql.VarChar,order_id)
        .query(`
             INSERT INTO orders (user_id, order_id)
             VALUES(@user_id,@order_id)
        `)

        return result
        
    } catch (error) {
        return error
    }

}

export const getOrdersByUserService=async(user_id)=>{
    try {
        const result =await poolRequest()
        .input('user_id', mssql.VarChar,user_id)
        .query(`SELECT * FROM orders WHERE user_id =@user_id)`)

        return result.recordset
        
    } catch (error) {

        return error
        
    }
}

export const getAllOrdersService=async()=>{
    try {
         const result=await poolRequest()
         .query(
            `SELECT * FROM orders`
         )

         return result.recordset
    } catch (error) {
        return error
    }
}