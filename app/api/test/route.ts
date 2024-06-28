
export async function GET() {
    await new Promise((res,rej)=>setTimeout(res,5000));
    return Response.json({message:"Test Route Hit Successfully"});
}