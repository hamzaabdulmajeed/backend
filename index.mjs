// const express = require('express');
// const app = express();

// // Define routes and middleware here
// // ...

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import path from 'path';


const __dirname = path.resolve();

// import authRouter from './routes/auth.mjs'

import usersRouter from './routes/users.js'
// const cors = require('cors')
const app = express();
app.use(express.json()); // body parser
// app.use(cors())
// const allowedOrigins = [
//   "http://localhost:3000", // Local development
//   "https://frontend-eight-lilac.vercel.app/",// Production frontend
//   "https://frontend-eight-lilac.vercel.app/signin"
//   // Production frontend

// ];

app.use(
  cors({
    origin: 'https://frontend-eight-lilac.vercel.app/', // Frontend URL
    credentials: true, // Allow cookies to be sent
  })
);


// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (origin) {
//         // Allow any origin making a valid request
//         callback(null, true);
//       } else {
//         // Allow non-browser clients (e.g., Postman, server-to-server)
//         callback(null, true);
//       }
//     },
//     credentials: true, // Allow cookies and credentials
//   })
// );



// app.use(
//   cors({
//     origin: '*', // Replace with your frontend URL
//     credentials: true, // Allow sending cookies
//   })
// );
// app.use("/static", express.static(path.join(__dirname, 'static')))


app.use("/users", usersRouter) // Secure api


app.get('/', (req, res) => {
    res.status(200).send('Hello!');
  });
  


//     /static/vscode_windows.exe

app.use(express.static(path.join(__dirname, './web/build')))

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})