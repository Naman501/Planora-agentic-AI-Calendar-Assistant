// export async getCalendarConnection

import { CALENDAR_CONNECTION_ID, CALENDAR_CONNECTION_LABEL, descopeClient } from "../config/descope.js";
import { getCalendarConnectionRow } from "../repository/connection.repository.js";

function calendarAppId(){
    if(!CALENDAR_CONNECTION_ID){
        throw new Error("Not present in env:CALENDAR_CONNECTION_ID")
    }
    return CALENDAR_CONNECTION_ID
}

export async function getCalendarConnection(userId:string){
const row=await getCalendarConnectionRow(userId)
return {
    label: CALENDAR_CONNECTION_LABEL,
    status:row?.status ?? ("disconnected" as const)
}
}

export async function createCalendarConnectUrl(input:{
    userId:string,
    refreshToken:string,
    redirectUrl:string
}) {
    const response=await descopeClient.outbound.connect(calendarAppId(),{
        redirectUrl:input.redirectUrl
    },input.refreshToken
)
if(!response.ok || !response.data?.url) throw new Error('Could not start connection')

    
}