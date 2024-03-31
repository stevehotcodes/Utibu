import { Router } from "express";
import { getAllUsers, registerNewUser } from "../controllers/user.controllers.js";







const  userRouter=Router()
userRouter.post('/user',registerNewUser)
userRouter.get('/user', getAllUsers)





export default userRouter