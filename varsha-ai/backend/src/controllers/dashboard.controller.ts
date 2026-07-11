import {Response} from "express";

import {
    AuthRequest
} from "../middleware/auth.middleware";

import {Profile} from "../models/profile.model";

import {
    getWeather
} from "../services/weather.service";

import {
    calculateRisk
} from "../services/risk.service";

import {
    generatePreparednessPlan
} from "../services/ai.service";


export async function getDashboard(
    req:AuthRequest,
    res:Response
){

const profile =
await Profile.findOne({
    userId:req.userId
});


if(!profile){

return res.status(404).json({

message:"Profile not found"

});

}


const weather =
await getWeather(
    profile.location
);



const risk =
calculateRisk(weather);



const plan =
await generatePreparednessPlan({

location:profile.location,

familyMembers:profile.familyMembers,

children:profile.children,

elderly:profile.elderly,

homeType:profile.homeType,


weather,

risk

});



res.json({

profile,

weather,

risk,

plan

});


}