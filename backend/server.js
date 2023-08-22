import app from "./app.js";
import DataConn from './config/database.js';

DataConn()
const port= process.env.PORT || 4000
app.listen(port,()=>{

    console.log("listening at port 4000")
})
