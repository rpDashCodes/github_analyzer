import 'dotenv/config';
import express from "express"; 

import analyzeRoutes from "./routes/analyze.route.js"
import analysisRoutes from "./routes/analysis.route.js"

const requiredEnvVars = [
    "GITHUB_TOKEN",
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME"
];

for(const envVar of requiredEnvVars){

    if(!process.env[envVar]){

        throw new Error(
            `Missing environment variable: ${envVar}`
        );
    }
}
const port = process.env.SRV_PORT || 3000;
const app = express();
app.use(express.json())
app.use("/api/analyze",analyzeRoutes)
app.use("/api/analysis",analysisRoutes)

app.get("/",(req,res)=>{
    res.json({
        name: "GitHub Analyzer API",
        version: "1.0.0",
        endpoints: {
            analyzeUser:
                "/api/analyze?username=rpDashCodes",

            getUserAnalysis:
                "/api/analysis?username=rpDashCodes",

            getAllAnalyses:
                "/api/analysis"
        },
        author: "Rudra Prasad Dash",
        email:"rudraprasaddash337@gmail.com"
    });
})
app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
}) 