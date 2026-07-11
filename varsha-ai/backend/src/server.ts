import app from "./app";

import {env} from "./config/env";

import {connectDatabase}
from "./config/database";


async function startServer(){

    await connectDatabase();


    app.listen(
        env.PORT,
        ()=>{

            console.log(
                `Server running on ${env.PORT}`
            );

        }
    );

}


startServer();