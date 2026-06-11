import { fetchGitData } from "../services/githubAnalyze.service.js";
export default async function analyze(req,res){
    try{
        const data = await fetchGitData(req.query.gitId);
        res.send(data);
    }catch(error){
        if(error.name == "AbortError")
        {
            res.json({"error":"Request Timed Out"});
        }else{
            res.json({"error":error.message});
        }
    }

}