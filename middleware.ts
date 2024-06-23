import { NextRequest, NextResponse } from "next/server";
import { Monitor } from "./app/api/monitor/route";

export const runtime = 'nodejs'

export default async function middleware(req:NextRequest){

    const { pathname } = req.nextUrl
    
    const {status} = NextResponse.next();

    if(pathname.startsWith("/api") && pathname !== '/api/monitor'){
        
        const body : Monitor = {
            method:req.method,
            monitorType:"total_req",
            path:req.nextUrl.href,
            statusCode:status
        }
    
        const res = await fetch(`${req.nextUrl.origin}/api/monitor`,{
            method:"POST",
            body:JSON.stringify(body)
        });
    
        const data = await res.json();
        console.log("The res from monitor is : ",data);
    }

}