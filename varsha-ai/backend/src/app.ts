import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import weatherRoutes from "./routes/weather.routes";
import aiRoutes from "./routes/ai.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import profileRoutes from "./routes/profile.routes";

import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import {env} from "./config/env";

import {notFoundMiddleware} from "./middleware/notFound.middleware";
import {errorMiddleware} from "./middleware/error.middleware";


const app = express();



app.use(
    helmet()
);


app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials:true
    })
);



app.use(
    express.json({
        limit:"10kb"
    })
);


app.use(
    cookieParser()
);


app.use(
    morgan("dev")
);



app.use(
    rateLimit({

        windowMs:15 * 60 * 1000,

        max:100,

        message:{
            message:"Too many requests"
        }

    })
);



app.get(
    "/health",
    (_req: Request, res: Response)=>{

        res.json({

            status:"ok",

            service:"varsha-ai-api"

        });

    }
);


app.use(
"/api/v1/auth",
authRoutes
);
app.use(
"/api/v1/profile",
profileRoutes
);
app.use(
"/api/v1/weather",
weatherRoutes
);
app.use(
"/api/v1/ai",
aiRoutes
);
app.use(
"/api/v1/dashboard",
dashboardRoutes
);
app.use(
"/api/v1/profile",
profileRoutes
);



app.use(
    notFoundMiddleware
);


app.use(
    errorMiddleware
);



export default app;