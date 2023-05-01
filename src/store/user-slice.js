import { async } from "@firebase/util";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import UseLocalStorage from "../hooks/UseLocalStorage";
import axios from 'axios'

const initialState={
    loading:true,
    loggedInUser:"",
    msg:"",
    err:"",
    isLoggedIn:false,
    published:[],
    myposts:[],
    myfav:[],
    save:"",
    userId:"",
    
}



const {setLoggedInUser,getLoggedInUser}=UseLocalStorage();

export const loginUser=createAsyncThunk(
    'users/loginUserStatus',
    async (userdetails,{rejectWithValue})=>{


           try{

           
            const  loginAction=await axios.post("http://localhost:4000/login",userdetails);
            const data=await loginAction.data;
             return data;

           }
           catch(err){

            return rejectWithValue(err.response.data.error)

           }
        
       
    }
)

export const unPublishAudio=createAsyncThunk(
    'users/unpublishaudio',
    async (userdetails,{rejectWithValue})=>{


           try{

            const token=getLoggedInUser();
            const  loginAction=await axios.post("http://localhost:4000/unPublishAudio",userdetails,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            });
            const data=await loginAction.data;
             return data;

           }
           catch(err){

            return rejectWithValue(err.response.data.error)

           }
        
       
    }
)


export const unPublishScript=createAsyncThunk(
    'users/unpublishscript',
    async (userdetails,{rejectWithValue})=>{


           try{

            const token=getLoggedInUser();
            const  loginAction=await axios.post("http://localhost:4000/unPublishScript",userdetails,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            });
            const data=await loginAction.data;
             return data;

           }
           catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)

           }
        
       
    }
)

export const registerUser=createAsyncThunk(
    'users/registerUserStatus',
    async (userdetails,{rejectWithValue})=>{

        try{
            const  registerAction=await axios.post("http://localhost:4000/signup",userdetails);
            const data=await registerAction.data;
             return data;
        }
        catch(error){
            console.log(error)
            return rejectWithValue(error.response.data.error)


        }
        

    }
)

export const getMyPosts=createAsyncThunk(
    'user/posts',
    async(dummy,{rejectWithValue})=>{
        try{

            console.log("gerMyPosts")
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/AllStoriesByUser",dummy,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;
              console.log(data,"postsssssssssssssssss")
            return data



        }
        catch(err){


            console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const deleteSave=createAsyncThunk(
    'user/deleteSave',
    async(dummy,{rejectWithValue})=>{
        try{

            console.log("gerMyPosts")
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/deleteSave",dummy,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;

            return data



        }
        catch(err){
            return rejectWithValue(err.response.data.error)
        }
    }
)

export const getMyFav=createAsyncThunk(
    "users/fav",
    async(dummy,{rejectWithValue})=>{
        try{
             
           
            console.log("gerMyFav")
            const token=getLoggedInUser();
            console.log(token)
            const myPosts=await axios.post("http://localhost:4000/getAllFav",dummy,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;
            console.log(data,"fav00000000000000")

            return data

        }
        catch(err){
            return rejectWithValue(err.response.data.error)

        }
    }
)

export const getMyPublished=createAsyncThunk(
    "users/published",
    async(dummy,{rejectWithValue})=>{
        try{
            console.log("gerMyPublished")

            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/storiesPublishedByUser",dummy,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;
            console.log(data,"publishedddddd")
            return data

        }
        catch(err){
            return rejectWithValue(err.response.data.error)

        }
    }
)


export const getMyId=createAsyncThunk(
    "users/getId",
    async(_,{rejectWithValue})=>{
        try{
            console.log("gerMyId")

            const dummy={
                dummy:"dummy"
            }
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/getUserId",_,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;


            console.log(data)

            return data

        }
        catch(err){

            console.log(err)
            return rejectWithValue(err.response.data.error)

        }
    }
)


export const getMyAudio=createAsyncThunk(
    "users/getAudio",
    async(details,{rejectWithValue})=>{
        try{
            console.log("gerMyId")

            const dummy={
                dummy:"dummy"
            }
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/loginAudio",details,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;
          console.log(data,"[[[[[[[[[[[[[[[[")


            return data

        }
        catch(err){
            return rejectWithValue(err.response.data.error)

        }
    }
)

export const getPublishedById=createAsyncThunk(

    "Editor/PublishedById",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post("http://localhost:4000/getpublishedById",userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999idddddddddddddddddddddddddd")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const getMyFavAudio=createAsyncThunk(
    "users/getFavAudio",
    async(details,{rejectWithValue})=>{
        try{
            console.log("gerMyId")

            const dummy={
                dummy:"dummy"
            }
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/getAllLoggedInFav",details,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;
          console.log(data,"check this out")
            return data

        }
        catch(err){

            console.log(err)
            return rejectWithValue(err.response.data.error)

        }
    }
)



export const getAllAudiosbyUser=createAsyncThunk(
    "users/getAllAudioUser",
    async(details,{rejectWithValue})=>{
        try{
            console.log("gerMyId")

            const dummy={
                dummy:"dummy"
            }
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/getAllAudiosBy",details,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;

            return data

        }
        catch(err){
            return rejectWithValue(err.response.data.error)

        }
    }
)


export const removeAudioFav=
createAsyncThunk(
    "users/removeAudio",
    async(details,{rejectWithValue})=>{
        try{
            console.log("gerMyId")

            const dummy={
                dummy:"dummy"
            }
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/removeAudioFromFavourite",details,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;

            return data

        }
        catch(err){
            return rejectWithValue(err.response.data.error)

        }
    }
)


export const removeScriptFav=
createAsyncThunk(
    "users/removeScript",
    async(details,{rejectWithValue})=>{
        try{
            console.log("gerMyId")

            const dummy={
                dummy:"dummy"
            }
            const token=getLoggedInUser();

            const myPosts=await axios.post("http://localhost:4000/removeScriptFromFavourite",details,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept'       : 'application/json'
                }
            })

            const data=await myPosts.data;

            return data

        }
        catch(err){
            return rejectWithValue(err.response.data.error)

        }
    }
)



const userSlice= createSlice({
    name:"Users",
    initialState,

    reducers:{
        clearMsg(state,action){
            state.msg=""
            state.err=""
    
    
        } 

    }    ,
    extraReducers:(builder)=>{

        builder.addCase(loginUser.pending,(state,action)=>{
            state.loading=true,
            state.msg="",
            state.save=""
        })

        builder.addCase(loginUser.fulfilled,(state,action)=>{

            console.log(action)
            setLoggedInUser(action.payload.token)

            state.loading=false
        
            state.msg="successfully loged in"
            state.isLoggedIn=true
            state.err=""
            state.save=""
            state.userId=action.payload.id
        })

        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            state.save=""

        })



        builder.addCase(registerUser.pending,(state,action)=>{
            state.loading=true,
            state.msg=""
            state.save=""
        })

        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false
    
            state.msg="successfully registered"
            state.err=""
            state.save=""
        })

        builder.addCase(registerUser.rejected,(state,action)=>{

            console.log(action,"please work")
            state.loading=false
            state.msg=""
            state.err=action.payload
            state.save=""
        })


        builder.addCase(getMyPosts.pending,(state,action)=>{
             state.loading=true,
             state.msg=""
             state.loggedInUser=""
             state.save=""
        })

        builder.addCase(getMyPosts.fulfilled,(state,action)=>{
            console.log(action.payload,"insiiiiiiiiiiiiiiiiiiiiide")
            state.loading=false
            state.msg="",
            state.loggedInUser=action.payload
            state.save="save"
        })

        builder.addCase(getMyPosts.rejected,(state,action)=>{
            state.loading=false
            state.msg="",
            state.err=action.payload
            state.loggedInUser=""
            state.save=""
        })


        builder.addCase(getMyFav.pending,(state,action)=>{
            state.loading=true,
            state.msg=""
            state.loggedInUser=""
            state.save=""
       })

       builder.addCase(getMyFav.fulfilled,(state,action)=>{
           state.loading=false
           state.msg="",
           state.loggedInUser=action.payload
           state.save="Fav"
       })

       builder.addCase(getMyFav.rejected,(state,action)=>{
           state.loading=false
           state.msg="",
           state.err=action.payload
           state.loggedInUser=""
           state.save=""
       })


       builder.addCase(getMyPublished.pending,(state,action)=>{
        state.loading=true,
        state.msg=""
        state.loggedInUser=""
        state.save=""
   })

   builder.addCase(getMyPublished.fulfilled,(state,action)=>{
       state.loading=false
       state.msg="",
       state.loggedInUser=action.payload
       state.save="published"
       
   })

   builder.addCase(getMyPublished.rejected,(state,action)=>{
       state.loading=false
       state.msg=""
       state.err=action.payload
       state.loggedInUser=""
       state.save=""
   })

   builder.addCase(getMyId.pending,(state,action)=>{
    state.loading=true
    
})

builder.addCase(getMyId.fulfilled,(state,action)=>{
   state.loading=false
   state.msg=""
   state.userId=action.payload
   
})

builder.addCase(getMyId.rejected,(state,action)=>{
   state.loading=false
   
   state.userId="you need to login first"
})

builder.addCase(getPublishedById.pending,(state,action)=>{
    state.loading=true,
    state.msg=""
    state.loggedInUser=""
    state.save=""

})

builder.addCase(getPublishedById.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="",
   state.loggedInUser=action.payload
   state.save="published"
})

builder.addCase(getPublishedById.rejected,(state,action)=>{
   state.loading=false
   state.msg="",
   state.err=action.payload
   state.loggedInUser=""
   state.save=""
   
})

builder.addCase(getMyAudio.pending,(state,action)=>{
    state.loading=true,
    state.msg=""
    state.loggedInUser=""
    

})

builder.addCase(getMyAudio.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="",
   state.loggedInUser=action.payload
   
})

builder.addCase(getMyAudio.rejected,(state,action)=>{
   state.loading=false
   state.msg="",
   state.err=action.payload
   state.loggedInUser=""
   
   
})


builder.addCase(getMyFavAudio.pending,(state,action)=>{
    state.loading=true,
    state.msg=""
    state.loggedInUser=""
    

})

builder.addCase(getMyFavAudio.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="",
   state.loggedInUser=action.payload
   
})

builder.addCase(getMyFavAudio.rejected,(state,action)=>{
   state.loading=false
   state.msg="",
   state.err=action.payload
   state.loggedInUser=""
   
   
})


builder.addCase(getAllAudiosbyUser.pending,(state,action)=>{
    state.loading=true,
    state.msg=""
    state.loggedInUser=""
    state.save=""

})

builder.addCase(getAllAudiosbyUser.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="",
   state.loggedInUser=action.payload
   
})

builder.addCase(getAllAudiosbyUser.rejected,(state,action)=>{
   state.loading=false
   state.msg=""
   state.err=action.payload
   state.loggedInUser=""
   
   
})


builder.addCase(deleteSave.pending,(state,action)=>{
    state.loading=true
    state.msg=""
    

})

builder.addCase(deleteSave.fulfilled,(state,action)=>{
   state.loading=false
   state.msg=""
   
   
})

builder.addCase(deleteSave.rejected,(state,action)=>{
   state.loading=false
   state.msg=""
   state.err=action.payload
   
   
   
})


builder.addCase(unPublishAudio.pending,(state,action)=>{
    state.loading=true
    state.msg=""
    

})

builder.addCase(unPublishAudio.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="unpublished successfully"
   
   
})

builder.addCase(unPublishAudio.rejected,(state,action)=>{
   state.loading=false
   state.msg=""
   state.err=action.payload
   
   
   
})


builder.addCase(unPublishScript.pending,(state,action)=>{
    state.loading=true
    state.msg=""
    

})

builder.addCase(unPublishScript.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="unpublished successfully"
   
   
})

builder.addCase(unPublishScript.rejected,(state,action)=>{
   state.loading=false
   state.msg=""
   state.err=action.payload
   
   
   
})


builder.addCase(removeAudioFav.pending,(state,action)=>{
    state.loading=true
    state.msg=""
    

})

builder.addCase(removeAudioFav.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="removed from favourite"
   
   
})

builder.addCase(removeAudioFav.rejected,(state,action)=>{
   state.loading=false
   state.msg=""
   state.err=action.payload
   
   
   
})

builder.addCase(removeScriptFav.pending,(state,action)=>{
    state.loading=true
    state.msg=""
    

})

builder.addCase(removeScriptFav.fulfilled,(state,action)=>{
   state.loading=false
   state.msg="removed from favourite"
   
   
})

builder.addCase(removeScriptFav.rejected,(state,action)=>{
   state.loading=false
   state.msg=""
   state.err=action.payload
   
   
   
})




    }
})

export default userSlice.reducer

export const {clearMsg} =userSlice.actions