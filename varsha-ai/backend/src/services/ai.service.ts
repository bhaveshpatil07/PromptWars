import OpenAI from "openai";
import { env } from "../config/env";


const client = new OpenAI({

    apiKey: env.GROQ_API_KEY,

    baseURL:
    "https://api.groq.com/openai/v1"

});


export async function generatePreparednessPlan(
    context:any
){

const prompt = `

You are an expert monsoon disaster preparedness assistant.

Generate a personalized safety plan.

User:

Location:
${context.location}

Family members:
${context.familyMembers}

Children:
${context.children}

Elderly:
${context.elderly}

Home type:
${context.homeType}


Weather:

Temperature:
${context.weather.temperature}

Humidity:
${context.weather.humidity}

Rain:
${context.weather.rain}


Risk:
${context.risk.level}


Return ONLY JSON.

Structure:

{
"riskLevel":"",
"preparationSteps":[],
"emergencyKit":[],
"travelAdvice":"",
"healthAdvice":""
}

`;



const response =
await client.chat.completions.create({

model:
"llama-3.3-70b-versatile",

messages:[

{
role:"system",
content:
"You provide accurate monsoon safety guidance."
},

{
role:"user",
content:prompt
}

],

temperature:0.3

});


let content =
response.choices[0]
.message
.content;


if(!content){
    throw new Error(
        "AI response empty"
    );
}


// Remove markdown code blocks
content =
content
.replace(/```json/g, "")
.replace(/```/g, "")
.trim();


return JSON.parse(content);
}