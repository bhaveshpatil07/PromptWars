import {
    Request,
    Response
}
    from "express";


import {
    getWeather
}
    from "../services/weather.service";


import {
    calculateRisk
}
    from "../services/risk.service";


import {
    AppError
}
    from "../utils/AppError";


import {
    asyncHandler
}
    from "../utils/asyncHandler";



export const currentWeather =

    asyncHandler(

        async (

            req: Request,

            res: Response

        ) => {


            const city =
                String(req.query.city || "")
                    .trim();



            if (!city) {


                throw new AppError(

                    "Please select a city to get weather information",

                    400,

                    "CITY_REQUIRED"

                );


            }



            if (city.length < 2) {


                throw new AppError(

                    "Please enter a valid city name",

                    400,

                    "INVALID_CITY"

                );

            }



            const weather =
                await getWeather(city);



            const risk =
                calculateRisk(weather);



            return res.status(200)
                .json({

                    success: true,

                    message:
                        "Weather fetched successfully",

                    data: {

                        city,

                        weather,

                        risk

                    }

                });


        }

    );