import express from "express"
import logger from "./src/utils/logger.js"
import { appPool } from "./src/utils/dbConnect.js"
import cors from 'cors'
import userRouter from "./src/routes/userRoutes.js"
import bodyParser from "body-parser"
import productRouter from "./src/routes/productRoute.js"
import orderRouter from "./src/routes/orderRoutes.js"
import dotenv from 'dotenv'


dotenv.config()




const app=express()
const port =5000 || process.env.PORT 

//middleware
app.use(cors())
app.use(bodyParser())
// app.get('/',(req,res)=>{
//     logger.info("hello , I am healthhy 💪")
//     // return res.status(200).json({message:"hello Im am healthy"})
// })




app.use('/api',userRouter)
app.use('/api', productRouter)
app.use('/api', orderRouter )







app.listen(port,()=>{
   logger.info(`I am a running on http://localhost:${port}...................`)
})





