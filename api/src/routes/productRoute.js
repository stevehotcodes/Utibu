import { Router } from "express";
import { addMedicalProduct } from "../controllers/products.controller.js";





const productRouter=Router()

productRouter.post('/product', addMedicalProduct)






export default productRouter