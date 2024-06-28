## Prom-Next
Prom-Next serves as a Demo app for integrating Prometheus in Next.js application.

### Things to Know
- Since the prom-client package relies on the Nodejs api the Next middleware can't use the prom-client library in the middleware. Currently Next.js do not support Nodejs in the middleware.
- As a workaround a custom Middleware (using Express.js) is implemented to observe the incoming requests.

## What's inside

- The `app` folder contains the next app.
- The `server.ts` file acts as the middeware and observe the incoming requests.

### Contributions
I love and welcome open source contributions, if you have any queries, concerns or enhancements which you feel elevate or bring value to the repo, kindly feel free to raise them. Your feedback is valuable and will help me to improve Medmatch.

To contribute, you can:

   - **Raise an issue** : If you encounter any problems or have suggestions for improvements, please create an issue on this GitHub repository. I will review it and  work together with you to find a solution.

   - **Submit a pull request** : If you have a specific improvement in mind, you can fork the repository, make your changes, and submit a pull request. I will review your changes and merge them if they align with the project's goals.

Thank you for your support !!!