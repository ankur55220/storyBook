import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { convertToRaw } from "draft-js";
import UseLocalStorage from "../hooks/UseLocalStorage";
import axios from 'axios'
import { url } from "../url";


const url=process.env.url

const initialState={
    editorData:"",
    msg:"",
    err:"",
    loading:true,
    backendEditdata:"",
    edited:false,
    homeData:"",
    active:"scripts",
    dropdown:"",
    navTrigger:false,
    likeStatus:false,
    typeOfPost:""

}

const {setLoggedInUser,getLoggedInUser}=UseLocalStorage();

export const getFalse=createAsyncThunk(

"false/save",
    async(_,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/sendFalse`,_,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)
export const saveedit=createAsyncThunk(

    "Editor/save",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/editSave`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)

export const updateedit=createAsyncThunk(

    "Editor/update",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/updateedit`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)




export const publishStory=createAsyncThunk(

    "Editor/publish",
    async(postDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/publishStory`,postDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)

export const getSingleData=createAsyncThunk(

    "Editor/singleData",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/getSingleStory`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const AddNotify=createAsyncThunk(

    "Editor/AddNotify",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/AddNotification`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const AddaudioNotify=createAsyncThunk(

    "Editor/AddaudioNotify",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/AddAudioNotify`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const getSingleAudio=createAsyncThunk(

    "Editor/singleAudio",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/getSingleAudio`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const changeSeen=createAsyncThunk(

    "Editor/changeseen",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/markAsSeen`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const getNameAndId=createAsyncThunk(

    "Editor/getNameId",
    async(userDetails,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm",userDetails)
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/getNamesAndId`,userDetails,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const getAllPublished=createAsyncThunk(

    "AllPublished",
    async(_,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.get(`${url}/getAllpublishedStories`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"published888888888")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const getAllaudio=createAsyncThunk(

    "AllAudio",
    async(_,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.get(`${url}/getAllAudios`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


//need to change the name to addsave
export const AddFavourite=createAsyncThunk(

    "AddFav",
    async(info,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/addFavourite`,info,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)



export const AddFavouriteAudio=createAsyncThunk(

    "AddFavAud",
    async(info,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/AddfavAudio`,info,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)

export const RemoveFavouriteAudio=createAsyncThunk(

    "RemFavAudio",
    async(info,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/RemovefavAudio`,info,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)


export const AddLikes=createAsyncThunk(

    "AddLIkes",
    async(details,{rejectWithValue})=>{
        try{

            console.log("asdafefmmmmmmmmm")
            const token=getLoggedInUser();
            const myPosts=await axios.post(`${url}/AddLikes`,details,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
          
            const data=await myPosts.data;

            console.log(data,"99999")
            return data
        }
        catch(err){
             console.log(err)
            return rejectWithValue(err.response.data.error)
        }
    }
)



export const EditorSlice=createSlice({
    name:"Editor",
    initialState,
    reducers:{
        addData(state,action){


            // console.log(action)
            // const data=JSON.stringify(convertToRaw(action.payload.getCurrentContent()))
            state.editorData=action.payload
            state.backendEditdata=""
            state.edited=true
        },

        changeActive(state,action){

            console.log(action.payload,"ssssssss")
        state.active=action.payload
        },
        changeNavTrigger(state,action){


        state.navTrigger=false
        },
        changeSaveToFav(state,action){
          state.save="Fav"
        },
        changeLikeStatus(state,action){
            state.likeStatus=action.payload
        }
       

        
},
extraReducers:(builder)=>{

    builder.addCase(saveedit.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
     
        state.edited=false
        
    })

    builder.addCase(saveedit.fulfilled,(state,action)=>{

       

        state.loading=false
    
        state.msg="successfully saved"
        
        state.err=""
       
        state.edited=false
    


    })

    builder.addCase(saveedit.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
       
        state.edited=false
        



    })


    builder.addCase(getSingleData.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
       
        state.edited=false
        


    })

    builder.addCase(getSingleData.fulfilled,(state,action)=>{

       
     console.log(action.payload,"checking......")
        state.loading=false
    
        state.msg=""
        
        state.err=""
        state.backendEditdata=action.payload
        state.edited=false
        


    })

    builder.addCase(getSingleData.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        state.backendEditdata=""
        state.edited=false
        



    })


    builder.addCase(updateedit.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
       
        state.edited=false
        


    })

    builder.addCase(updateedit.fulfilled,(state,action)=>{

       

        state.loading=false
    
        state.msg="updated successfully"
        
        state.err=""
        

        
    })

    builder.addCase(updateedit.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        
        state.edited=false
        



    })


    builder.addCase(publishStory.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err="",
        state.edited=false
        


    })

    builder.addCase(publishStory.fulfilled,(state,action)=>{

       

        state.loading=false
    
        state.msg="published successfully"
        
        state.err=""
        state.edited=false
        


        
    })

    builder.addCase(publishStory.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        
        state.edited=false
        



    })


    builder.addCase(getAllPublished.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
      
        

        

    })

    builder.addCase(getAllPublished.fulfilled,(state,action)=>{

       

        state.loading=false
    
        state.msg=""
        
        state.err=""
        state.homeData=action.payload
        state.typeOfPost=""
        

    

        
    })

    builder.addCase(getAllPublished.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
       
        

        


    })



    builder.addCase(AddFavourite.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
        

        
        

    })

    builder.addCase(AddFavourite.fulfilled,(state,action)=>{

       

        state.loading=false
    
        state.msg="added to favourite successfully"
        
        state.err=""
        

    
    

        
    })

    builder.addCase(AddFavourite.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        

        
        


    })



    builder.addCase(getAllaudio.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
        

        
        

    })

    builder.addCase(getAllaudio.fulfilled,(state,action)=>{

       

        state.loading=false
    
        state.msg=""
        
        state.err=""
        
        state.homeData=action.payload

    
    

        
    })

    builder.addCase(getAllaudio.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        

        
        


    })


    builder.addCase(getSingleAudio.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
        
        state.edited=false
        


    })

    builder.addCase(getSingleAudio.fulfilled,(state,action)=>{

       
     console.log(action.payload,"checking......audio")
        state.loading=false
    
        state.msg=""
        
        state.err=""
        state.backendEditdata=action.payload
        state.edited=false
        


    })

    builder.addCase(getSingleAudio.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        state.backendEditdata=""
        state.edited=false
        



    })


    builder.addCase(AddFavouriteAudio.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
       
        


    })

    builder.addCase(AddFavouriteAudio.fulfilled,(state,action)=>{

       
     console.log(action.payload,"checking......")
        state.loading=false
    
        state.msg="succesfully added"
        
        state.err=""
       


    })

    builder.addCase(AddFavouriteAudio.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
       
        



    })


    builder.addCase(RemoveFavouriteAudio.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err=""
       
        


    })

    builder.addCase(RemoveFavouriteAudio.fulfilled,(state,action)=>{

       
     console.log(action.payload,"checking......")
        state.loading=false
    
        state.msg="succesfully removed"
        
        state.err=""
       


    })

    builder.addCase(RemoveFavouriteAudio.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
       
        



    })

    builder.addCase(getNameAndId.pending,(state,action)=>{
        state.loading=true,
        state.msg="",
        state.err="",
        state.dropdown=""
       
        


    })

    builder.addCase(getNameAndId.fulfilled,(state,action)=>{

       
    
        state.loading=false
    
        state.msg=""
        
        state.err=""

        state.dropdown=action.payload
       


    })

    builder.addCase(getNameAndId.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload,
        state.dropdown=""
       
        



    })

    builder.addCase(AddNotify.pending,(state,action)=>{
        state.loading=true
        state.msg=""
        state.err=""

       
        


    })

    builder.addCase(AddNotify.fulfilled,(state,action)=>{

       
    
        state.loading=false
    
        state.msg="notification sent"
        
        state.err=""

        
       


    })

    builder.addCase(AddNotify.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        
       
        



    })

    builder.addCase(changeSeen.pending,(state,action)=>{
        state.loading=true
        state.msg=""
        state.err=""
        


       
        


    })

    builder.addCase(changeSeen.fulfilled,(state,action)=>{

       
    
        state.loading=false
    
        state.msg=""
        
        state.err=""
        state.navTrigger=true

        
       


    })

    builder.addCase(changeSeen.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        
       
        



    })

    builder.addCase(AddaudioNotify.pending,(state,action)=>{
        state.loading=true
        state.msg=""
        state.err=""
    

       
        


    })

    builder.addCase(AddaudioNotify.fulfilled,(state,action)=>{

       
    
        state.loading=false
    
        state.msg=""
        
        state.err=""

        
       


    })

    builder.addCase(AddaudioNotify.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        
       
        



    })


    builder.addCase(AddLikes.pending,(state,action)=>{
        state.loading=true
        state.msg=""
        state.err=""
    

       
        


    })

    builder.addCase(AddLikes.fulfilled,(state,action)=>{

       
    
        state.loading=false
    
        state.msg=action.payload.msg
        
        state.err="",
        state.likeStatus=true
        state.typeOfPost=action.payload.postType

        
       


    })

    builder.addCase(AddLikes.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        
       
        



    })


    builder.addCase(getFalse.pending,(state,action)=>{
        state.loading=true
        state.msg=""
        state.err=""
    

       
        


    })

    builder.addCase(getFalse.fulfilled,(state,action)=>{

       
        state.loading=false
        state.typeOfPost=""
    
        
        

        
       


    })

    builder.addCase(getFalse.rejected,(state,action)=>{
        state.loading=false
        state.msg=""
        state.err=action.payload
        
       
        



    })





}
})


export const {addData,changeActive,changeNavTrigger,changeSaveToFav,updateLikeStatus,changeLikeStatus}=EditorSlice.actions

export default EditorSlice.reducer;



