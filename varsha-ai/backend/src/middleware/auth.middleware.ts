import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { AppError } from "../utils/AppError";


export interface AuthRequest extends Request {

    userId?: string;

}


export function authMiddleware(

    req: AuthRequest,

    res: Response,

    next: NextFunction

) {


    const token =
        req.headers.authorization?.split(" ")[1];


    if (!token) {

        throw new AppError(

            "Authentication required",

            401,

            "NO_TOKEN"

        );

    }


    try {


        const decoded: any =
            jwt.verify(
                token,
                env.JWT_SECRET
            );


        req.userId =
            decoded.id;


        next();


    }
    catch (error) {
        throw new AppError(

            "Session expired. Please login again",

            401,

            "INVALID_TOKEN"

        );

    }
}