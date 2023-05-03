import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import UseLocalStorage from "../hooks/UseLocalStorage";
import axios from 'axios'
import { url } from "../url";


const initialState={
    loading:true,
    comments:"",
    msg:'',
    err:'',
    active:"",
    likeStatus:""
}

const {getLoggedInUser}=UseLocalStorage()


export const AddComments=createAsyncThunk(
    "comment/addComm",
    async(details,{rejectWithValue})=>{

        try{



            console.log(data,"working 88888888888888888888")
            
            const token=getLoggedInUser()

            const myPosts=await axios.post(`${url}/AddComment`,details,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;
            console.log(data,"working 88888888888888888888")
            
            return data



        }
        catch(err){
            console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const addReply=createAsyncThunk(
    "comment/addReply",
    async(details,{rejectWithValue})=>{

        try{



            console.log(data,"working 88888888888888888888")
            
            const token=getLoggedInUser()

            const myPosts=await axios.post(`${url}/AddReply`,details,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;
            console.log(data,"working 88888888888888888888")
            
            return data



        }
        catch(err){
            console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)

export const AllComments=createAsyncThunk(
    "comment/AllComm",
    async(details,{rejectWithValue})=>{

        try{



            console.log(details,"working 88888888888888888888")
            
            const token=getLoggedInUser()

            const myPosts=await axios.post(`${url}/getAllComments`,details,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;
            console.log(data,"working 88888888888888888888")
            
            return data



        }
        catch(err){
            console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)

export const commentSlice=createSlice({
    name:"comments",
    initialState,
    reducers:{

        currentActive(state,action){
            state.active=action.payload
        }
        

    },
    extraReducers:(builder)=>{
        builder.addCase(AddComments.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
            

        })

        builder.addCase(AddComments.fulfilled,(state,action)=>{

            
            state.loading=false
            state.msg=action.payload
            state.err=""
            

        })

        builder.addCase(AddComments.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            

        })


        builder.addCase(AllComments.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
            

        })

        builder.addCase(AllComments.fulfilled,(state,action)=>{

            
            
            
            state.comments=action.payload
            state.msg=""
            state.err=""
            state.loading=false

        })

        builder.addCase(AllComments.rejected,(state,action)=>{
            
            state.msg=""
            state.err=action.payload
            state.loading=false
    

        })

        builder.addCase(addReply.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
            

        })

        builder.addCase(addReply.fulfilled,(state,action)=>{

            
            
            
            
            state.msg="reply added"
            state.err=""
            state.loading=false

        })

        builder.addCase(addReply.rejected,(state,action)=>{
            
            state.msg=""
            state.err=action.payload
            state.loading=false
    

        })
    }
})


export const {currentActive,updateLikeStatus}=commentSlice.actions;

export default commentSlice.reducer;