import { configureStore } from "@reduxjs/toolkit";

import bookMarkSlice  from "./dummy-slice";
import userSlice from "./user-slice";
import editorSlice from "./editor-slice";
import audioSlice from "./audio-slice";
import commentSlice from "./comment-slice";

export const store = configureStore({
    reducer:{
        bookmark:bookMarkSlice,
        users:userSlice,
        editor:editorSlice,
        audio:audioSlice,
        comment:commentSlice
    }
})