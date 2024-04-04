import mssql from 'mssql'
import * as uuid from 'uuid'
import { poolRequest } from '../utils/dbConnect.js'




export const addSalesItemService=async({sales_id,product_id,quantity,price,order_id})=>{
    try {

        const result=await poolRequest()
        .input('sales_id', mssql.VarChar,sales_id)
        .input('product_id', mssql.VarChar, product_id)
        .input('quantity', mssql.Int, quantity)
        .input('price',mssql.Decimal,price)
        .input('order_id', mssql.VarChar, order_id)
        .query(`
            INSERT INTO sales (sales_id,product_id,price,order_id)
            VALUES(@sales_id, product_id, quantity,price,order_id)
        
        
        `)

        return result.rowsAffected
        
    } catch (error) {

        return error

    }

}


