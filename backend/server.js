import app from "./app.js";



const port= process.env.port || 4000
app.listen(port,()=>{

    console.log("listening at port 4000")
})