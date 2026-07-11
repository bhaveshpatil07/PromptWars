import {Router} from "express";

import {
createPlan
}
from "../controllers/ai.controller";


const router=Router();


router.post(
"/plan",
createPlan
);


export default router;