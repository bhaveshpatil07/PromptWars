import axios from "axios";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

export async function getWeather(city: string) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const data = response.data;

    return {
      location: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].description,
      rain: data.rain ? data.rain["1h"] || 0 : 0,
    };

  } catch (error: any) {

    // If we already threw our custom error, pass it forward
    if (error instanceof AppError) {
      throw error;
    }


    // Axios errors handling
    if (axios.isAxiosError(error)) {

      // City not found
      if (error.response?.status === 404) {
        throw new AppError(
          "City not found",
          404,
          "CITY_NOT_FOUND"
        );
      }


      // OpenWeather API key invalid
      if (
        error.response?.status === 401
      ) {
        throw new AppError(
          "Weather service authentication failed",
          401,
          "WEATHER_AUTH_FAILED"
        );
      }


      // OpenWeather server error
      if (
        error.response?.status &&
        error.response.status >= 500
      ) {
        throw new AppError(
          "Weather information is currently unavailable",
          503,
          "WEATHER_SERVICE_UNAVAILABLE"
        );
      }


      // Timeout / network issue
      if (error.code === "ECONNABORTED") {
        throw new AppError(
          "Weather service request timed out",
          504,
          "WEATHER_TIMEOUT"
        );
      }
    }


    // Unknown errors
    throw new AppError(
      "Unable to fetch weather data",
      500,
      "WEATHER_FETCH_FAILED"
    );
  }
}