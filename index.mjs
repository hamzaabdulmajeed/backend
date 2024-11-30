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


app.use(
  cors({
    origin: "https://frontend-one-liart-41.vercel.app", // Replace with your frontend URL
    credentials: true, // Allow sending cookies
  })
);
app.use("/users", usersRouter) // Secure api


app.get('/', (req, res) => {
    res.status(200).send('Hello!');
  });
  


//     /static/vscode_windows.exe
// app.use("/static", express.static(path.join(__dirname, 'static')))

// app.use(express.static(path.join(__dirname, './web/build')))

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})