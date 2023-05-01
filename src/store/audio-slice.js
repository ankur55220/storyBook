import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import UseLocalStorage from "../hooks/UseLocalStorage";
import axios from 'axios'

const initialState={
    msg:"",
    err:"",
    data:"",
    loading:false,
    bookmarks:[],
    audioUrl:"",
    audId:""
}


const {getLoggedInUser}=UseLocalStorage()
export const getSingleSave=createAsyncThunk(
    "audio/get",
    async(postId,{rejectWithValue})=>{

        try{



            console.log(data,"working 88888888888888888888")
            
            const token=getLoggedInUser()

            const myPosts=await axios.post("http://localhost:4000/getSingleSave",postId,{
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



export const AddBookMark=createAsyncThunk(
    "audio/addbookmark",
    async(postdata,{rejectWithValue})=>{

        try{


            console.log("jjjjjjjj")
            const token=getLoggedInUser()

            const myPosts=await axios.post("http://localhost:4000/addbookmark",postdata,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            

            const data=await myPosts.data;
            console.log(data,"lllll")
            
            return data



        }
        catch(err){

            console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const getAllBookMark=createAsyncThunk(
    "audio/allbookmark",
    async(postdata,{rejectWithValue})=>{

        try{

            const token=getLoggedInUser()

            const myPosts=await axios.post("http://localhost:4000/getAllBookMark",postdata,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

export const removeBookMark=createAsyncThunk(
    "audio/removebookmark",
    async(postdata,{rejectWithValue})=>{

        try{

            const token=getLoggedInUser()

            const myPosts=await axios.post("http://localhost:4000/removeBookmark",postdata,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

export const updateFav=createAsyncThunk(
    "audio/updateFav",
    async(postdata,{rejectWithValue})=>{

        try{

            console.log(postdata,"======")

            const token=getLoggedInUser()

            const myPosts=await axios.post("http://localhost:4000/updateFav",postdata,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

export const AddNewAud=createAsyncThunk(
    "audio/addNew",
    async(postdata,{rejectWithValue})=>{

        try{

            const token=getLoggedInUser()

            const myPosts=await axios.post("http://localhost:4000/AddNewAudio",postdata,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data)
            
            return data



        }
        catch(err){
            return rejectWithValue(err.response.data.error)
        }
    }
)
export const audioSlice=createSlice({
    name:"audio",
    initialState,

    reducers:{
        addUrl(state,action){
            state.audioUrl=action.payload
        },
        resetAudid(state,action){
            state.audId=""
        }

    },

    extraReducers:(builder)=>{
        builder.addCase(getSingleSave.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
            state.data=""
            state.audId=""

        })

        builder.addCase(getSingleSave.fulfilled,(state,action)=>{

            console.log(action.payload,"00000ppppp")
            state.loading=false
            state.msg=""
            state.err=""
            state.data=action.payload

        })

        builder.addCase(getSingleSave.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            state.data=""

        })



        builder.addCase(AddBookMark.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
            state.data=""

        })

        builder.addCase(AddBookMark.fulfilled,(state,action)=>{
            state.loading=false
            state.msg="successfully added"
            state.err=""
            state.data=""

        })

        builder.addCase(AddBookMark.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            state.data=""

        })



        builder.addCase(getAllBookMark.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
        
            state.bookmarks=[]

        })

        builder.addCase(getAllBookMark.fulfilled,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=""
            
            state.bookmarks=action.payload

        })

        builder.addCase(getAllBookMark.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            state.data=""
            state.bookmarks=[]

        })

        builder.addCase(removeBookMark.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
            
            state.bookmarks=[]

        })

        builder.addCase(removeBookMark.fulfilled,(state,action)=>{
            state.loading=false
            state.msg="succesfully removed"
            state.err=""
            
            state.bookmarks=action.payload

        })

        builder.addCase(removeBookMark.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            
        

        })


        builder.addCase(updateFav.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
    

        })

        builder.addCase(updateFav.fulfilled,(state,action)=>{
            state.loading=false
            state.msg="succesfully updated"
            state.err=""
            state.data=action.payload

        })

        builder.addCase(updateFav.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            
        

        })

        builder.addCase(AddNewAud.pending,(state,action)=>{
            state.loading=true
            state.msg=""
            state.err=""
            state.data=""

        })

        builder.addCase(AddNewAud.fulfilled,(state,action)=>{
            state.loading=false
            state.msg="succesfully published"
            state.err=""
            state.data=""
            state.audId=action.payload.id

        })

        builder.addCase(AddNewAud.rejected,(state,action)=>{
            state.loading=false
            state.msg=""
            state.err=action.payload
            state.data=""
        

        })

       


    }
   
})


export const {addUrl,resetAudid}=audioSlice.actions

export default audioSlice.reducer;