import {User} from '../model/User.js'

import bcrypt from 'bcrypt'
import { AsyncMiddleWare } from '../middleware/AsyncMiddleWare.js'
import jwt from 'jsonwebtoken'
import ErrorClass from '../middleware/NewErrorClass.js'
export const RegisterController=AsyncMiddleWare(

    async (req,res,next)=>{

       
  const {username,email,password} = req.body
 
  if(!username || !email || !password){
    
  
    return next(new ErrorClass("fields cant be empty",401));
    
  }

       const user= await User.findOne({email:email});
       
       console.log(user,"here")
       if(user){
        return res.status(401).json({
            success:false,
            msg:"email already present"
        })
       }

      
       const hashedPassword=await bcrypt.hash(password,10);
       

    const newUser=await  User.create({
        username,
        email,
        password:hashedPassword
       })
       
    // User.create({
    //     username,
    //     email,
    //     password:hashedPassword
    //    })
    //    .then((res)=>{
    //     console.log(res)
    //    })
    //    .catch((err)=>{
    //     console.log(err)
    //    })

      

   await newUser.save()
    

    console.log("gggggg")
       return res.status(200).json({
        success:true,
        msg:"successfully registered"
       })



    }
)


export const LoginController=AsyncMiddleWare(

    async (req,res,next)=>{

        const {email,password}=req.body;

        if(!email || !password){
            return next(new ErrorClass("fields cant be empty",401))
        }

        const currUser=await User.findOne({email:email})

        if(!currUser){
            return next(new ErrorClass("email or password is incorrect",401))
        }


        const unhashedPass=await bcrypt.compare(password,currUser.password);

        if(!unhashedPass){

            return next(new ErrorClass("email or password is incorrect",401))
        }


        const token=await jwt.sign({
            user:{
                username:currUser.username,
                email:currUser.email,
                id:currUser._id
            },
            
        },
        process.env.TOKEN_KEY,
        {expiresIn:"1d"}
        
        )

        return res.status(200).json({success:true,msg:"logedIn success",token,id:currUser._id})

    }
)