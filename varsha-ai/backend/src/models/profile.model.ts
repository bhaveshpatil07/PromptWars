import mongoose, {Schema,Document} from "mongoose";


export interface IProfile extends Document {

    userId: mongoose.Types.ObjectId;

    location:string;

    familyMembers:number;

    children:number;

    elderly:number;

    homeType:
    "apartment" |
    "house" |
    "other";

}


const profileSchema =
new Schema<IProfile>(
{

userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
},


location:{
    type:String,
    required:true
},


familyMembers:{
    type:Number,
    default:1
},


children:{
    type:Number,
    default:0
},


elderly:{
    type:Number,
    default:0
},


homeType:{
    type:String,
    enum:[
        "apartment",
        "house",
        "other"
    ],
    default:"other"
}


},
{
timestamps:true
});


export const Profile =
mongoose.model<IProfile>(
"Profile",
profileSchema
);