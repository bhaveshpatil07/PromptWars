import { Request, Response } from "express";

import {
    generatePreparednessPlan
}
    from "../services/ai.service";


export async function createPlan(

    req: Request,

    res: Response

) {


    const plan =
        await generatePreparednessPlan(
            req.body
        );



    res.json({

        success: true,

        plan

    });


}