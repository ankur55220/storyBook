import mongoose from "mongoose";


const storySchema = new mongoose.Schema({

    body:{
        type:String,
        required:[true,"field cant be empty"]
    },
    summary:{
       type:String,
       default:""
    },
    genre:{
        type:String,
        default:""

    },

    isSaved:{
        type:Boolean,
        default:false
      },
    title:{
        type:String,
        default:""
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    format:{
        type:String,
        default:"script"

    },
    status:{
        type:String,
        default:"unpubslished"
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    saves:{
        type:Number,
        default:0
    }

},{
    timestamps:true
})



export const Story=mongoose.model("Story",storySchema)