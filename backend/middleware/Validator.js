import Jwt from 'jsonwebtoken'
import { AsyncMiddleWare } from './AsyncMiddleWare.js'
import ErrorClass from './NewErrorClass.js'

export const ValidatorMiddleware=AsyncMiddleWare(async (req,res,next)=>{
//    console.log("im coming here",req.headers.Authorization )
    
    const header=req.headers.Authorization || req.headers.authorization

    
    if(!header){
        return next(new ErrorClass("you need to be logged in first",401))
    }
    const token= header.split(" ")[1];
    // console.log(token)

    await Jwt.verify(token,process.env.TOKEN_KEY,(err,user)=>{

        if(err){
            console.log(err,"yaham hai pakro")
            return next(new ErrorClass("you need to login first",401))
        }

        // console.log("dekho hame",user)
        req.user=user;
        next()
    });





})