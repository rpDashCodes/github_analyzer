import { findOverviewByUsername } from "../dao/overview.dao.js";
import { findReposByOverviewId } from "../dao/repos.dao.js";
import { buildAnalysisSummary } from "./analysis.service.js";

async function getStoredUserAnalysis(username) {
    if (!username) {
        throw new Error("username is required");
    }

    const overview = await findOverviewByUsername(username);

    if (!overview) {
        throw new Error("No saved analysis found for this username");
    }

    const repos = await findReposByOverviewId(overview.id);

    return buildAnalysisSummary(overview, repos);
}

export { getStoredUserAnalysis };