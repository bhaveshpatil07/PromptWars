import {Router} from "express";

import {
    getProfile,
updateProfile
}
from "../controllers/profile.controller";

import {
authMiddleware
}
from "../middleware/auth.middleware";


const router=Router();


router.put(
"/",
authMiddleware,
updateProfile
);
router.get(
"/",
authMiddleware,
getProfile
);

export default router;