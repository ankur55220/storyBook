import app from "./app.js";



const port= process.env.PORT || 4000
app.listen(port,()=>{

    console.log("listening at port 4000")
})