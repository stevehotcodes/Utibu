import { Router } from "express";
import { addMedicalProduct, getAllProducts } from "../controllers/products.controller.js";





const productRouter=Router()

productRouter.post('/product', addMedicalProduct)
productRouter.get('/product', getAllProducts)





export default productRouter