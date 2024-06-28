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

//histogram for res handler time taken
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});

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
                const timeTaken = endTime - startTime;
    
                //inc the total req
                requestCounter.inc({
                    method:req.method,
                    route:pathname,
                    status_code:res.statusCode
                })

                //put the timeTaken in the appropriate
                httpRequestDurationMicroseconds.observe({
                    method:req.method,
                    route:pathname,
                    status_code:res.statusCode
                },timeTaken);

                //dec the gauge
                activeRequestsGauge.dec();

                console.log(`${pathname} took ${timeTaken}ms and it's status ${res.statusCode}`);
    
                
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