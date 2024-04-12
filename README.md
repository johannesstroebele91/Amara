# amara: Pomodoro Productivity Tracker

amara is a cloud-based application designed to boost your productivity using the Pomodoro Technique. It allows you to set focused 25-minute work intervals, helping you achieve more throughout your day. This project utilizes TypeScript, Angular, Angular Material, Firebase Authentication, and Vercel for a smooth, performant, and cross-platform user experience.

# Features

- 25-Minute Pomodoro Timer: Set and track your work intervals with a clean and intuitive interface.
- Start/Stop and Reset Buttons: Easily control your timer and start fresh whenever needed.
- Login and Registration: Securely register and log in using your email and password.

# Technology

- Mobile-First Design: for seamless use across various platforms.
- Frontend: built with Angular and Angular Material for a robust and up-to-date development foundation.
- Routing with Authentication Guards: Restricts access based on user login status.
- Authentication: Secure user access through Firebase's built-in authentication features.
- Data Storing: Retrieves and stores data efficiently using Firebase's services.
- Vercel Deployment: Leverages Vercel's serverless platform for scalability and reliability.

# Development and Deployment

- Development Server: Run ng serve for a local development server accessible at http://localhost:4040/. Changes to source files trigger automatic reloading.
- Build: Run ng build to create production-ready build artifacts stored in the dist/ directory. Use the --prod flag for optimized production builds.
- Production Deployment: After building, run node server.js to start the production server. Deployment can be automated using Vercel's continuous integration features.
