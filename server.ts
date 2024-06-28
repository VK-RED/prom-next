const express = require('express');
const client  = require('prom-client');
const next = require('next');
const url = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//count the total http requests
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

//gauge for the active requests
const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Number of active requests'
})

app.prepare()
.then(()=>{

    const server = express();

    //expose the endpoint for the prom, 

    server.get("/metrics",async (req:any,res:any)=>{
        const metrics = await client.register.metrics();
        const contentType = client.register.contentType;
        res.set('Content-Type',contentType);
        return res.send(metrics);
    });

    //handle all the nextjs req and observe

    server.all('*', (req:any, res:any) => {

        const parsedUrl = url.parse(req.url, true);
        const { pathname } : {pathname:string} = parsedUrl;
        
        if(pathname.startsWith("/api")){

            const startTime = Date.now();

            activeRequestsGauge.inc();

            res.on('finish',()=>{
                
                const endTime = Date.now();
    
                //Total time taken in ms took for handling a req 
                const totalTime = endTime - startTime;
    
                //inc the total req
                requestCounter.inc({
                    method:req.method,
                    route:pathname,
                    status_code:res.statusCode
                })

                //dec the gauge
                activeRequestsGauge.dec();
                
                console.log(`${pathname} and the status ${res.statusCode}`);
    
                
            })

        }
        

        return handle(req, res)
    });

    server.listen(3001, () => {
        console.log(
            `🚀 http application ready on http://localhost:${3001}`,
        );
    });

})
.catch(()=>{
    console.error("An execption happened");
    process.exit(1);
})