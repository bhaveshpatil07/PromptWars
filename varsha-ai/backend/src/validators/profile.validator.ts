import {z} from "zod";


export const profileSchema =
z.object({

location:
z.string().min(2),


familyMembers:
z.number().min(1),


children:
z.number().min(0),


elderly:
z.number().min(0),


homeType:
z.enum([
"apartment",
"house",
"other"
])


});