import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter username"],
        uique:true
    },
    following:[{
        id:{
            type:String
        }
    }],
    followers:[{
        if:{
            type:String
        }

    }],
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"enter password"]
    },
    profilePic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    likes:[{
        id:{
            type:String,
        }
    }],
    dislikes:[{
        id:{
            type:String,
        }
    }],
    notifications:[{
        format:{
            type:String
        },

        audid:{
          type:String
        },
        postid:{
            type:String
        },
        seen:{
            type:String
        },
        by:{
            type:String
        }
    }],

   Saved:[{
    summary:{
        type:String


    },
        body:{
            type:String
            

        },
        authorId:{
            type:String,
            required:[true,"author not present"]
        },
        postId:{
            type:String,
            required:[true,"id is missing"]
        },
        pic:{
            type:String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
        bookmarks:[{

            id:{
                type:String,
                required:true
                

            },
            name:{
                type:String,
                required:[true,"name is missing"]
            },
            start:{
                type:String,
                required:[true,"start is missing"]
            },
            end:{
                type:String,
                required:[true,"end is missing"]
            },
            point:{
                type:String,
                required:[true,"instance is required"]
            }
        }]
    }],

    favAudio:[
        {
            audId:{
                type:String

            }

        }
    ]


},{
    timestamps:true
})


export const User=mongoose.model('User',userSchema)