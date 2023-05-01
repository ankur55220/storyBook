import mongoose from 'mongoose'


const commentSchema = new mongoose.Schema({
    body:{
        type:String,
        required:[true,"field cant be empty"]
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    parent:{
        type:String,
        default:"-1"
    },
    likes:{
       type:Number,
       default:0
    },
    dislikes:{
        type:Number,
        default:0
     },
    postId:{
        type:String,
        required:[true,"need post id to which this comment belongs to"],
        
    }
},{
    timestamps:true
})

export const Comment= mongoose.model("Comment",commentSchema)