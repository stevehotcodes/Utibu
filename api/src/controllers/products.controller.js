import { dataFethched, sendBadRequest, sendNotFound, sendServerError, sendSuccess } from "../helpers/helper.function.js"
import { addNewProductService, getAllMedicalProductsService, getProductService } from "../services/productServices.js"
import logger from "../utils/logger.js"
import * as uuid from 'uuid'
import { productValidator } from "../validators/productValidators.js"



export  const getProduct= async (req,res)=>{
    try{
      const {id} = req.params
  
      let product = await getProductService(id)
      console.log(product)
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
     const {error}=productValidator(req.body)
     if (!product_name || !price || !product_description) {
       sendBadRequest(res, 'missing all or either productName, productDescription, and price')
     }
     if(error){
       console.log(error)
     }
     else{
          let inputs= {product_name, product_description, price}
          inputs = stock_quantity && stock_quantity >= 0 ? {...inputs, stock_quantity} : inputs
        
          const result=await addNewProductService({product_name,product_description,price,stock_quantity})
          console.log(result)
          if(result>0){
            sendSuccess(res,"product added successfully")
          }

     }
    
      
    }
    catch(error){
     return res.status(500).json({message: error.message})
    }
 }
 
 
export  const getAllProducts= async (req,res)=>{
  try{

    let products=await getAllMedicalProductsService()

    if(products){

        return res.status(200).json(products)
    }
    sendNotFound(res, "no products found")
  }
  catch(error){
  sendServerError(res, error.message)
    
  }
}

