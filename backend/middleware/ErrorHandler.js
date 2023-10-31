export const ErrorHandler=async (err,req,res,next)=>{


    const statuscode= 404;

    console.log(err,"aaayega to")
 res.status(err.statusCode).json({error:err.message})


    
    // res.status(statuscode)

    

    // switch (statuscode) {
    //     case 401:
    //         res.json({
    //             title:"unauthorized",
    //             error:err.meassage
    //         })
            
    //         break;

    //      case 404:
    //         console.log("addaefef",typeof statuscode)
    //       res.json({
    //             title:"not found",
    //             error:err.meassage
    //         })
            
        
    //         break;

    //      case 500:
    //             res.json({
    //                 title:"server error",
    //                 error:err.meassage
    //             })
                    
    //          break;
    
    //     default:
    //         break;
    // }
}

