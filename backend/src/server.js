import express from "express";
import taskRouters from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

// Middlewares

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", taskRouters);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server start in port 5001");
    });
});
