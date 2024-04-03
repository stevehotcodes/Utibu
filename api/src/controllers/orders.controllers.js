import { dataFethched, sendBadRequest, sendNotFound, sendServerError, sendSuccess } from "../helpers/helper.function.js"
import { createNewMedicalOrderService, getAllOrdersService, getCartService, getOrdersByUserService, removeItemFromCartService } from "../services/orderService.js"
import * as uuid from 'uuid'
import { addSalesItemService } from "../services/salesService.js"





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
         
         //proceed to create the medical order
         await createNewMedicalOrderService(user_id,order_id)
         let order_total=0

         //move cart items to sales
         for(const item of cart){
            order_total=item.price
            const sales_id=uuid.v4()

            await addSalesItemService(sales_id,item.product_id,item,quantity,item.price,order_id)


         }
         //clear cart 
         await removeItemFromCartService(cart.cart_id)

         return res.status(201).json({
            message:'order creared successfully',
            order_total,
            itemsCount:cart.length,
            order_id
         })

         
        
    } catch (error) {
        sendServerError(res,error.message)
        
    }

}

export const getMedicalOrderbyUser=async(req, res)=>{
    try {

        const user_id=req.params.user_id
        const orders=await getOrdersByUserService(user_id)
        if(orders.length){return res.status(200).json(orders)}
        sendNotFound(res, "orders not found")
        
    } catch (error) {
        sendServerError(res,error.message)
        
    }
}

export const getAllMedicalOrders=async(req,res)=>{
    try {
         const orders=await getAllOrdersService()
         if(!orders.length){sendNotFound(res,'orders not found')}
         return res.status(200).json(orders)      

    } catch (error) {
        sendServerError(res, error.message)
    }
}