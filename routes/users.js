import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import express from 'express';

import { client } from './../mongodb.mjs'
import { ObjectId } from 'mongodb'

const db = client.db("Restaurant");
const col = db.collection("users");

let router = express.Router()


// router.post('/addUser', async (req, res, next) => {
//     console.log('Users!', new Date());

//     if (
       

//         !req.body.name
//         || !req.body.email
//         || !req.body.password
//         // || !req.body.image
//     ) {
//         res.status(403);
//         res.send(`required parameters missing, 
//         example request body:
//         {
//             name: "malik",
//             email: "malik@gmail.com",
//             password: 123456
//         } `);
//         return;
//     }

//     try {
//         const insertResponse = await col.insertOne({
//             // _id: "7864972364724b4h2b4jhgh42",
//             // id: req.body.id,
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             // image: req.body.image,


//             createdOn: new Date()
//         });
//         console.log("insertResponse: ", insertResponse);

//         res.send('User created');
//     } catch (e) {
//         console.log("error inserting mongodb: ", e);
//         res.status(500).send('server error, please try later');
//         toast.error('server error, please try later')
//     }
// })




// router.get('/:email', async (req, res) => {
//     try {
//       const userEmail = req.params.email;
  
//       // Check if the provided ID is a valid MongoDB ObjectId
//       if (!ObjectId.isValid(userEmail)) {
//         return res.status(400).send("Invalid user Email");
//       }
  
//       // Find a product by its _id
//       const user = await col.findOne({ email: (userEmail) });
  
//       if (!user) {
//         return res.status(404).send("User not found");
//       }
  
//       // Return the product as JSON
//       res.status(200).send(user);
//     }catch (error) {
//       console.error("Error fetching user by email: ", error);
//       res.status(500).send("Server error, please try again later");
//     }
//   });

router.post('/addUser', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate the email format
    // if (!email /|| !/\S+@\S+\.\S+/.test(email)) {
    //   return res.status(400).send("Invalid email format");
    // }

    // Check if the user already exists by email
    const existingUser = await col.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
      ; // 409 Conflict
    }

    // If user doesn't exist, proceed with registration
    const newUser = { email, password, name }; // Add any other fields you want
    const result = await col.insertOne(newUser);

    // Respond with success message
    res.status(201).json({ message: "User registered successfully"});
  } catch (error) {
    console.error("Error during user registration: ", error)
    res.status(500).json("Server error, please try again later");
  }
});

router.post('/getUser', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists by email
    const user = await col.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Incorrect email" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If user is authenticated, send back the user ID and set cookie
    // const userId = user._id; // Extract user's unique ID
    // res.setHeader(
    //   'Set-Cookie',
    //   `userId=${userId}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=86400`
    // );
    

    // Return success response with user ID
    res.status(200).json({ user});
    // console.log("User authenticated:", userId);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});


// router.post('/getUser', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists by email
//     const user = await col.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({ message: "Incorrect email" });
//     }

//     // Check if the password matches
//     if (user.password !== password) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     // Generate a unique token
//     const token = crypto.randomBytes(32).toString("hex");

//     // Set the token in a cookie
//     res.setHeader('Set-Cookie', `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`); // Cookie valid for 1 day (86400 seconds)

//     // Respond to the client
//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Error processing login: ", error);
//     res.status(500).json({ message: "Server error, please try again later" });
//   }
// });

// const authenticateToken = async (req, res, next) => {
//   const authToken = req.cookies.authToken; // Extract the token from the cookie

//   if (!authToken) {
//     return res.status(401).json({ message: "Unauthorized: Token missing" });
//   }

//   try {
//     // Validate the token by checking if it exists in the database
//     const user = await col.findOne({ authToken: authToken });
//     if (!user) {
//       return res.status(403).json({ message: "Forbidden: Invalid token" });
//     }

//     req.user = user; // Attach user information to the request
//     next(); // Pass control to the next middleware or route handler
//   } catch (error) {
//     console.error("Error validating token: ", error);
//     res.status(500).json({ message: "Server error, please try again later" });
//   }
// };

// router.post('/getUser', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
    
//     const user = await col.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json("Incorrect email");
//     }

    
//     if (user.password !== password) {
//       return res.status(401).json("Incorrect password");
//     }
//     res.status(200).json(user);
    
//   } catch (error) {
//     console.error("Error fetching user by email: ", error);
//     res.status(500).json("Server error, please try again later");
//   }
// });

router.post('/logout', (req, res) => {
  try {
    // res.setHeader('Set-Cookie', 'userId=; Path=/; Max-Age=0; HttpOnly');
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
     res.status(500).json({ error: "Logout failed" });
  }
});



// router.get('/', async (req, res, next) => {

//     const cursor = col.find({})
//         .sort({ _id: -1 })
//         .limit(100);

//     try {
//         let results = await cursor.toArray()
//         console.log("results: ", results);
//         res.send(results);
//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })


export default router