import express from 'express';
import dontenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import connectMongoDB from './db/connectMongoDB.js';

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

dontenv.config();

// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);
// console.log(process.env.MONGO_URI);
// console.log(process.env.PORT);
// console.log(process.env.JWT_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// payload size should not set to large as it increases the risk of DOS attack

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notifications", notificationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.log("ERROR: ", err);
    } else {
        console.log(`SERVER IS RUNNING ON ${PORT}`);
        connectMongoDB();
    }
})