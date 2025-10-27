import express from "express"
import cors from "cors"
import Mainrouter from "./routes/route"
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/v1",Mainrouter);
app.listen(3000);