import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {User} from "../models/user.model";
import {env} from "../config/env";


export async function registerUser(data:any){

const existing=
await User.findOne({
email:data.email
});


if(existing){
throw new Error("User already exists");
}


const hashedPassword=
await bcrypt.hash(data.password,10);


const user=
await User.create({

...data,

password:hashedPassword

});


return user;

}



export async function loginUser(
email:string,
password:string
){


const user=
await User.findOne({email});


if(!user){
throw new Error("Invalid credentials");
}


const valid=
await bcrypt.compare(
password,
user.password
);


if(!valid){
throw new Error("Invalid credentials");
}


const token=
jwt.sign(

{
id:user._id
},

env.JWT_SECRET,

{
expiresIn:"7d"
}

);


return {
token,
user:{
id:user._id,
name:user.name,
email:user.email
}
};


}