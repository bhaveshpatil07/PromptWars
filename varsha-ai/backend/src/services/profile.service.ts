import {Profile} from "../models/profile.model";


export async function createOrUpdateProfile(
userId:string,
data:any
){

return Profile.findOneAndUpdate(

{
userId
},

{
...data,
userId
},

{
upsert:true,
new:true
}

);

}