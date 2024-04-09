import { Router } from "express";
import { addItemtoCart, createNewMedicalOrder, getAllMedicalOrders, getMedicalOrderbyUser } from "../controllers/orders.controllers.js";





const orderRouter=Router()

orderRouter.get('/order/:user_id', getMedicalOrderbyUser)
orderRouter.get('/order', getAllMedicalOrders)
orderRouter.post('/order/:user_id', createNewMedicalOrder)
orderRouter.post('/cart/:user_id', addItemtoCart)



export default orderRouter
