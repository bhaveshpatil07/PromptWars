import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    location?:string;
}


const userSchema = new Schema<IUser>(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true,
        minlength:8
    },

    location:{
        type:String
    }

},
{
    timestamps:true
});


export const User =
mongoose.model<IUser>("User",userSchema);