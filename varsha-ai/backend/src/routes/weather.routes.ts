import {Router} from "express";

import {
currentWeather
}
from "../controllers/weather.controller";


const router=Router();


router.get(
"/current",
currentWeather
);


export default router;