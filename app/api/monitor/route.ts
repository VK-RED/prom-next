import { requestCounter } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export interface Monitor{
    monitorType : 'total_req',
    path:string
    statusCode:number,
    method:string|number
}

export async function POST(request: NextRequest) {

    const {method,monitorType,path,statusCode} : Monitor = await request.json();

    if(monitorType === 'total_req' && path && statusCode && method){
        requestCounter.inc({method,route:path,status_code:statusCode});
        return NextResponse.json({message:"COLELCTED THE METRICS"});
    }   
    else{
        return NextResponse.json({message:"MISSING METRIC DETAILS !"});
    }

}