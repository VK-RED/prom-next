import { requestCounter } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,res:NextResponse) {
    requestCounter.inc({
        method: req.method,
        route: req.nextUrl.href,
        status_code: 200,
    });

    console.log("Req method is : ",req.method);
    console.log("Req route is : ",req.nextUrl.href);
    return Response.json({message:"Printed Successfully !!"});
}