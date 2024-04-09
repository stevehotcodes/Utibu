import { Router } from "express";
import { addItemtoCart, createNewMedicalOrder, getAllMedicalOrders, getMedicalOrderbyUser, removeItemFromAnCart } from "../controllers/orders.controllers.js";
import { authenticateUser } from "../middleware/authmiddleware.js";





const orderRouter=Router()

orderRouter.get('/order/:user_id', getMedicalOrderbyUser)
orderRouter.get('/order', getAllMedicalOrders)
orderRouter.post('/order/:user_id', createNewMedicalOrder)
orderRouter.post('/cart/:user_id', addItemtoCart)
orderRouter.delete('/cart/:product_id' ,authenticateUser,removeItemFromAnCart)



export default orderRouter