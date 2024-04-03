import { Router } from "express";
import { getAllUsers, loginUser, registerNewUser } from "../controllers/user.controllers.js";







const  userRouter=Router()
userRouter.post('/user',registerNewUser)
userRouter.get('/user', getAllUsers)
userRouter.post('/login', loginUser)





export default userRouter