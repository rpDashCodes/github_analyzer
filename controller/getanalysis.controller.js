import { getStoredUserAnalysis } from "../services/githubAnalyzeRead.service.js";

export async function queryAnalysis(req, res) {
    try {
        const data = await getStoredUserAnalysis(req.query.username);
        res.send(data);
    } catch (error) {
        res.json({ error: error.message });
    }
}