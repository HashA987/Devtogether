# Project-name: DevTogather

# DevTogather is a job platform only for tech professional to find their dream job and for companies to find the best talents.

## Features

Roles:

job seeker.
Sign up, See job listing apply , login, logout.
job provider.
Sign up, Post job, See job listing, login, logout.

## Technologies Used

-Next.js
-Node.js
-Express.js
-PostgreSQL
-Tailwind CSS

## Day1-coding-wednsay

Next.js Installation:  
npm create next-app@latest .

-For build in button styling purpose we have used shadcn/ui library and for icons we have used lucide-react library.
-npx shadcn@latest init

-BUilding Navbar components.
-Installing Themes. using npm install next-themes. (ui.shadcn.com/docs/themes)
-Building HomePage.
-Emoji- gnome-charachters
-Reaserch about how to Use AI in our project.

## Day2-coding-thursday

-Building footer page
-Building about page.
-building login and register page.

## day3-coding-friday

-Made pages responsive.
-add styling to the pages.
-installing backend dependencies. npm init -y
-npm i -g typescript
-npx tsc --init
-npm i express dotenv bcrypt jsonwebtoken
-npm i -D @types/express @types/dotenv @types/bcrypt @types/jsonwebtoken
-install pg admin; npm install pg
sudo -u postgres psql
-create database psql -U postgres
-create database devtogather; CREATE DATABASE devtogather;

<!-- -neondb for darabase setup.
npm i @neondatabase/serverless
-->

## day4-coding-saturday

Created dataabase connection file in backend services auth src utils db.ts

        # folder structure:
        -routes: we keep routinf files and API endpoints
        -utils: we keep database connection file and other utility files
        -app.ts: we create express app and use middlewares and routes
        -controllers: we keep business logic for API endpoints
        -libs: we keep helper functions and other libraries
        -Appcontext: folder is usually created to store React Context logic used for managing global state across the applicatio

        questions:  express dotenv jsonwebtoken cors datauri multer @neondatabase/serverless fileBuffer what are they used for?
       -Express.js
         A Node.js web framework used to build backend servers and APIs, Handles routes, requests, and responses.
        -dotenv
        Loads environment variables from a .env file.
        -jsonwebtoken
           -Used to create and verify JWT tokens for authentication,Helps keep users logged in securely.

         -cors
           Enables Cross-Origin Resource Sharing, Allows your frontend and backend on different domains to communicate.

          Data URI
          Converts files (like images) into base64 strings.Often used when uploading images to cloud services.

          Multer
         Middleware used to handle file uploads in Node.js.

           fileBuffer
           A buffer is binary data stored in memory.
             Used when working with uploaded files before saving or processing them.

## day5-coding-sunday

- working on database
  -debugging backend and database.
  -worked on frontend styling
  -figured our signed up database structure

## day-6-coding-,odany

-Checked backend with postman
-created backend for register page and login page
-debugging backend

## day-7-coding-tuesday

-worked on backedn
-creadted mypofile and userprofile backend with postman
-debugging backend

## day-8

-created resume database with backednd tested with postman
-addded skills to database and tested in backend with postman
-creatd job-seeker and recruiter dataBase and backend

-

## day-9

-create job database, updating jobs
--made respinsevie for small screen

## day-10

-worked on job companies database
-apply for jobs
--made responsive for small and medium screen

## day-11

-worked on job, company databse updating jobs company and deleting
-worked on backend
--create types for typescript

-

## day-12

-created myprofile button (logout)
-updated user profile pic in front end
-created static frontend for login register and userprofile pages

## day-13

-updated profile pic

## day-14

-update resume
-userprofile updated
-Addes userskill
-add my skills

-
