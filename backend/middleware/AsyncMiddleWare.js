
export const AsyncMiddleWare=(baseFunction)=>(

    (req,res,next)=>{

        console.log("kskdk")
        Promise.resolve(baseFunction(req,res,next)).catch(next)
    }
)