import mongoose from "mongoose"

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const DataConn=async()=>{

    try{
        const conn=await mongoose.connect(process.env.mongoUrl,connectionParams);
        console.log(`mongoDb connected {conn.connection.host} `)
    }
    catch(error){
        console.log("something went wrong")
       
    }



}




export default DataConn;

