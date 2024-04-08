import { dataFethched, sendBadRequest, sendCreated, sendNotFound, sendServerError, sendSuccess } from "../helpers/helper.function.js"
import { createCartService, createNewMedicalOrderService, getAllOrdersService, getCartService, getOrdersByUserService, removeItemFromCartService, updateCartItemQuantityService } from "../services/orderService.js"
import * as uuid from 'uuid'
import { addSalesItemService } from "../services/salesService.js"
import logger from "../utils/logger.js"





export  const createNewMedicalOrder=async(req,res)=>{
    try {

        // access the user id stored in the localstorage in the frontend 
         const user_id=req.params.user_id
         const order_id=uuid.v4()
         // get content of the cart
         const cart=await getCartService(user_id)
        //check whether the cart is empty
         if(!cart.length){
            sendNotFound(res,'your cart is empty')
         }
         else{
             //proceed to create the medical order
         await createNewMedicalOrderService(user_id,order_id)
         let order_total=0

         //move cart items to sales
         for(const item of cart){
            order_total=item.price
            const sales_id=uuid.v4()

            await addSalesItemService(sales_id,item.product_id,quantity,item.price,order_id)


         }
         //clear cart 
         await removeItemFromCartService(cart.cart_id)

         return res.status(201).json({
            message:'order creared successfully',
            order_total,
            itemsCount:cart.length,
            order_id
         })
         }
         
        

         
        
    } catch (error) {
        sendServerError(res,error.message)
        
    }

}

export const getMedicalOrderbyUser=async(req, res)=>{
    try {

        const user_id=req.params.user_id
        const orders=await getOrdersByUserService(user_id)
        if(orders.length){return res.status(200).json(orders)}
        else{   sendNotFound(res, "orders not found")}
      
        
    } catch (error) {
        sendServerError(res,error.message)
        
    }
}

export const getAllMedicalOrders=async(req,res)=>{
    try {
         const orders=await getAllOrdersService()
         if(!orders.length){sendNotFound(res,'orders not found')}
        else{ return res.status(200).json(orders)   }   

    } catch (error) {
        sendServerError(res, error.message)
    }
}

export const addItemtoCart=async(req, res)=>{
    try {
         const {user_id}=req.params;
         const{product_id,quantity}=req.body 

         //check whether the item exists in the cart
         const cart=await getCartService(user_id)
         logger.info(cart)
        
        const cartItem=cart.filter((item)=>{return item.user_id==user_id&& item.product_id==product_id})
        logger.info("cart item", cartItem)
        if(cartItem.length){
            const response=await updateCartItemQuantityService(cartItem.cart_id,cartItem.quantity+1);
            logger.info("updating item in the cart",response)
            sendSuccess(res, "Item quantity updated in the cart")

        }
        else{
            const response=await createCartService(product_id,quantity,user_id)
            logger.info("adding an item to the cart", response)
            console.log(response)
            sendSuccess(res, "item added to the cart")
        }
          
        
    } catch (error) {
        sendServerError(res,error.message)
    }
}