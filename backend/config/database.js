import mongoose from "mongoose"

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const DataConn=()=>{


    mongoose.connect(process.env.mongoUrl,connectionParams)
.then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log(err)
})


}




export default DataConn;

