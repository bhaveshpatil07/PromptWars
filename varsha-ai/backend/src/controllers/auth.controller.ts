import {Request,Response} from "express";

import {
registerUser,
loginUser
}
from "../services/auth.service";


export async function register(
req:Request,
res:Response
){

const user=
await registerUser(req.body);


res.status(201).json({

message:"User created",

user:{
id:user._id,
name:user.name,
email:user.email
}

});


}



export async function login(
req:Request,
res:Response
){

const result=
await loginUser(
req.body.email,
req.body.password
);


res.json(result);

}