import { env } from "~/env.mjs";

export const weatherApi = {
    getWeather: async (city: string) => {
        // TODO add check if city is valid
        if (env.NODE_ENV == "production") {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${env.WEATHER_API_KEY}&q=${city}&aqi=no`);
            const data = await response.json();
            return data;
        } else if (env.NODE_ENV == "development") {
            return {
                "location": {
                    "name": "Riga",
                    "region": "Riga",
                    "country": "Latvia",
                    "lat": 56.95,
                    "lon": 24.1,
                    "tz_id": "Europe/Riga",
                    "localtime_epoch": 1693600591,
                    "localtime": "2023-09-01 23:36"
                },
                "current": {
                    "last_updated_epoch": 1693600200,
                    "last_updated": "2023-09-01 23:30",
                    "temp_c": 14,
                    "temp_f": 57.2,
                    "is_day": 0,
                    "condition": {
                        "text": "Light rain",
                        "icon": "//cdn.weatherapi.com/weather/64x64/night/296.png",
                        "code": 1183
                    },
                    "wind_mph": 10.5,
                    "wind_kph": 16.9,
                    "wind_degree": 160,
                    "wind_dir": "SSE",
                    "pressure_mb": 1009,
                    "pressure_in": 29.8,
                    "precip_mm": 0.2,
                    "precip_in": 0.01,
                    "humidity": 82,
                    "cloud": 100,
                    "feelslike_c": 12.4,
                    "feelslike_f": 54.3,
                    "vis_km": 10,
                    "vis_miles": 6,
                    "uv": 1,
                    "gust_mph": 18.8,
                    "gust_kph": 30.2
                }
            }
        }
    },
    getForecast: async (city: string) => {
        // TODO add check if city is valid
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${env.WEATHER_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`);
        const data = await response.json();
        return data;
    },
};
