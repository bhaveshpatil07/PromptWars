import dotenv from "dotenv";

dotenv.config();


const requiredEnv = [
    "MONGO_URI",
    "JWT_SECRET"
];


requiredEnv.forEach((key)=>{

    if(!process.env[key]){
        throw new Error(
            `Missing environment variable: ${key}`
        );
    }

});


export const env = {

    PORT:
        Number(process.env.PORT) || 5000,

    NODE_ENV:
        process.env.NODE_ENV || "development",

    MONGO_URI:
        process.env.MONGO_URI as string,

    JWT_SECRET:
        process.env.JWT_SECRET as string,

    FRONTEND_URL:
        process.env.FRONTEND_URL || "*",

    OPENWEATHER_API_KEY:
        process.env.OPENWEATHER_API_KEY as string,

    GROQ_API_KEY:
        process.env.GROQ_API_KEY as string,

};