import * as uuid from 'uuid'
import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import logger from '../utils/logger.js'



export const getProductService=async(id)=>{
    try {
        const result=await poolRequest()
        .input('product_id',mssql.VarChar, id)
        .query(`SELECT * FROM tbl_medical_products WHERE product_id=@product-id`)

        return result.recordset

       
   } catch (error) {
       return error
   }


}



export const addNewProductService=async({product_name,product_description,price,stock_quantity})=>{

    const product_id=uuid.v4()
    try{
        const result=await poolRequest()
        .input('product_id',mssql.VarChar, product_id)
        .input('product_name',mssql.VarChar, product_name)
        .input('product_description',mssql.VarChar,product_description)
        .input('price', mssql.Decimal,price)
        .input('stock_quantity', mssql.Int,stock_quantity)

        .query(`
            INSERT INTO tbl_medical_products(product_id, product_name, prodcut_description, price, email, stock_quantity)
            VALUES(@prodcut_id, @product_name, @product_description,@price,@email,@stock_quqntity)        
        
        `)

        return result.rowsAffected

    }
    catch(error){
        return error

    }
}