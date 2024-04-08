import { Router } from "express";
import { addMedicalProduct, getAllProducts, getProduct } from "../controllers/products.controller.js";





const productRouter=Router()

productRouter.post('/product', addMedicalProduct)
productRouter.get('/product', getAllProducts)
productRouter.get('/product/:id', getProduct)




export default productRouter