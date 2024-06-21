import client from "prom-client"
export async function GET(_req:Request){
    
    const metrics = await client.register.metrics();
    const contentType = client.register.contentType;
    
    return new Response(metrics,{
        headers:{
            'Content-type':contentType,
        }
    });
};
   