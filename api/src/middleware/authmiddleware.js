import jwt from 'jsonwebtoken'
import { sendBadRequest } from '../helpers/helper.function.js';
import dotenv from 'dotenv'


dotenv.config()



export function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
    
        next();
    });
}

export function verifyAdmin (req, res,next){
    const authHeader = req.headers['authorization'];
    let message='Unauthorized'
    let  privileges='admin'
    //authentication
    const token=authHeader && authHeader.split('')[1]
    
    if(!token){return res.status(401).json(message)}
    
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        if(user.role==privileges){
            next();
        }else{return res.status(403).json({message:message})  }

    });
    
     

}