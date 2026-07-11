import {Response} from "express";
import {
AppError
}
from "../utils/AppError";
import {
AuthRequest
}
from "../middleware/auth.middleware";

import {
createOrUpdateProfile
}
from "../services/profile.service";
import { Profile } from "../models/profile.model";



export async function updateProfile(

req:AuthRequest,

res:Response

){


const profile =
await createOrUpdateProfile(

req.userId!,

req.body

);


res.json({

message:"Profile saved",

profile

});


}

export async function getProfile(
req:AuthRequest,
res:Response
){

const profile =
await Profile.findOne({
userId:req.userId
});


if(!profile){

if(!profile){

throw new AppError(

"Please complete your profile setup",

404,

"PROFILE_NOT_FOUND"

);

}

}


res.json({

success:true,

profile

});

}