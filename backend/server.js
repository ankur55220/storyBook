import app from "./app.js";
import DataConn from './config/database.js';
const port= process.env.PORT || 4000


DataConn().then(()=>{

    app.listen(port,()=>{
         console.log(`listening at port 4000 ${port}`)
    })
    
})

    


