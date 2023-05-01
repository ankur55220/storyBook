import { createSlice } from "@reduxjs/toolkit";


const initialState={
    bookmarks:[]
}


export const bookMarkSlice=createSlice({
    name:"bookmark",
    initialState,
    reducers:{
        addBookmark(state,action){

            const {start,end,placed}=action.payload
            console.log(action.payload)
            const isPresent=state.bookmarks.filter((item)=>(item.start==start && item.end==end))

            if(isPresent.length==0){
                let data={

                }

                data.start=start
                data.end=end
                data.placed=placed

                state.bookmarks.push(data)

            }


        },
        removeBookmark(state,action){
            const {start,end,placed}=action.payload

            const isPresent=state.bookmarks.filter((item)=>!(item.start==start && item.end==end))

            state.bookmarks=isPresent
            
        }
    }
})


export const{addBookmark,removeBookmark}=bookMarkSlice.actions

export default bookMarkSlice.reducer;