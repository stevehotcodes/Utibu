import { dataFethched, sendBadRequest, sendNotFound, sendServerError, sendSuccess } from "../helpers/helper.function.js"
import { addNewProductService, getProductService } from "../services/productServices.js"
import logger from "../utils/logger.js"
import * as uuid from 'uuid'



export  const getProduct= async (req,res)=>{
    try{
      const {id} = req.params
  
      let product = await getProductService(id)
      if(product[0]){
  
          return res.status(200).json(product[0])
      }
      sendNotFound(res, "The product is not available")
    }
    catch(error){
    sendServerError(res, error.message)
      
    }
  }


  export const addMedicalProduct = async(req,res)=>{
    try{
   
     const {product_name,product_description,price, stock_quantity}=req.body;
     if (!product_name || !price || !product_description) {
       sendBadRequest(res, 'missing all or either productName, productDescription, and price')
     }
     let inputs= {id, product_name, productDescription, price}
     inputs = stock_quantity && stock_quantity >= 0 ? {...inputs, stock_quantity} : inputs
    
     const result=await addNewProductService({product_name,product_description,price,stock_quantity})
      if(result>0){
        sendSuccess(res,"product added successfully")
      }
      
    }
    catch(error){
     return res.status(500).json({message: error.message})
    }
 }
 
 