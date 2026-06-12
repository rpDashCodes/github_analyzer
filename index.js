import 'dotenv/config';
import express from "express"; 

import analyzeRoutes from "./routes/analyze.route.js"
import analysisRoutes from "./routes/analysis.route.js"

const port = process.env.SRV_PORT || 3000;
const app = express();
app.use(express.json())
app.use("/api/analyze",analyzeRoutes)
app.use("/api/analysis",analysisRoutes)

app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
}) 