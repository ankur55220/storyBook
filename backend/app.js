import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

import auth from './routes/Auth.js'
import StoryRoutes from './routes/StoryRoutes.js'
import AudioRoutes from './routes/AudioRoutes.js'
import SavedRoutes from './routes/SaveRoutes.js'
import CommentRoutes from './routes/commentRoutes.js'
import {ErrorHandler} from './middleware/ErrorHandler.js';
import cors from 'cors'
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({path:path.join(__dirname,"/config/config.env")})




app.get("/",(req,res)=>{
  res.send({title:"book"});
})
  
app.use(auth)
app.use(StoryRoutes)
app.use(AudioRoutes)
app.use(SavedRoutes)
app.use(CommentRoutes)
app.use(ErrorHandler)

export default app;
