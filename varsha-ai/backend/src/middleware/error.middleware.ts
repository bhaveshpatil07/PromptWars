import {
Request,
Response,
NextFunction
}
from "express";


import {
AppError
}
from "../utils/AppError";


export function errorMiddleware(

err:any,

req:Request,

res:Response,

next:NextFunction

){


console.error(err);



if(err instanceof AppError){


return res.status(
err.statusCode
)
.json({

success:false,

message:err.message,

code:err.code

});


}



return res.status(500).json({

success:false,

message:
"Internal server error",

code:
"INTERNAL_ERROR"

});


}