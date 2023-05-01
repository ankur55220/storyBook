import mongoose from 'mongoose'


const AudioSchema = new mongoose.Schema({
    summary:{
        type:String,
        required:[true,"field cant be empty"]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    audio:{
        type:String,
        required:[true,"no audio file found"]
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    }
}, 
    {
    timestamps:true
})

export const Audio= mongoose.model("Audio",AudioSchema)