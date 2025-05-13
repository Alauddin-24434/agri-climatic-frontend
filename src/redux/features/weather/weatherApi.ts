import { baseApi } from "@/redux/api/baseApi";

const weatherApi= baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getWeatherData: builder.query({
            query:(city:string)=>({
                url:`/weather/${city}`,
                method  : "GET",
            }),
            
        })
    })
});


export const { useGetWeatherDataQuery } = weatherApi;