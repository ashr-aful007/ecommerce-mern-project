//custom function for errorResponse handle its take paramiter with obj
const errorResponse = (res, {statusCode = 500, message =
      "internal server error"}) =>{
          return res.status(statusCode).json({
               success : false,
                message,
             });
}


//custom function for success handle payload for get deffrent input
const successResponse = (res, {statusCode = 200, message =
     "success", payload = {}}) =>{
         return res.status(statusCode).json({
              success : true,
               message,
               payload,
            });
}



module.exports = {errorResponse, successResponse };