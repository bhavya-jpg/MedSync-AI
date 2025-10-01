import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import MedicineRoutes from './routes/medicineRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = [
    'http://localhost:5173','http://localhost:5174'
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json());



app.use("/api/medicine",MedicineRoutes );
// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

mongoose.connect("mongodb+srv://heyanushkagupta_db_user:qySDIVIDo5v7Blgf@cluster0.ttdy0sm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => app.listen(process.env.PORT || 8080, () => console.log("Server running")))
  .catch(err => console.error(err));