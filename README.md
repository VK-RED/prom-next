## Prom-Next
This project servers as a template for **( Nextjs+Prometheus+Grafana )**  stack.

### Things to Know
- Since the prom-client package relies on the Nodejs api the Next middleware can't use the prom-client library in the middleware. Currently Next.js do not support Nodejs in the middleware.
- As a workaround a custom Middleware (using Express.js) is implemented to observe the incoming requests.

## What's inside

- The `app` folder contains the next app.
- The `server.ts` file acts as the middeware and observe the incoming requests.

## Run locally
#### Before you can run the application make sure you have installed `docker` and `docker compose`
- Clone the repo `git clone https://github.com/VK-RED/prom-next.git`
- Install the dependencies ```yarn install``` in the root folder
- Run `docker compose up` to start the application

After running the command, you'll see a 
- Nextjs application running at [http://localhost:3001/](http://localhost:3001/) 
- Prometheus application running at [http://localhost:9090/](http://localhost:9090/)
- Grafana application running at [http://localhost:3002/](http://localhost:3002/) 

   You can login to Grafana with the following credentials:
   - email : `admin`
   - password : `admin`

	You can also visit [http://localhost:3001/metrics](http://localhost:3001/metrics) to see the dumped data
   ![Screenshot from 2024-06-29 12-47-04](https://github.com/VK-RED/prom-next/assets/130341088/b1a6de9d-acbf-4ab1-999f-157a1ce50aea)

	Which can be better monitored in the Grafana Dashboard
	![Screenshot from 2024-06-29 12-46-46](https://github.com/VK-RED/prom-next/assets/130341088/96e1cb92-4116-4c24-8894-9ca6cd577be4)

### Contributions

I love and welcome open source contributions, if you have any queries, concerns or enhancements which you feel elevate or bring value to the repo, kindly feel free to raise them. Your feedback is valuable and will help me to improve the project.

To contribute, you can:

   - **Raise an issue** : If you encounter any problems or have suggestions for improvements, please create an issue on this GitHub repository. I will review it and  work together with you to find a solution.

   - **Submit a pull request** : If you have a specific improvement in mind, you can fork the repository, make your changes, and submit a pull request. I will review your changes and merge them if they align with the project's goals.

Thank you for your support !!!