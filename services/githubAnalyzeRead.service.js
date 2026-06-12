import { findAllOverviews, findOverviewByUsername } from "../dao/overview.dao.js";
import { findReposByOverviewId } from "../dao/repos.dao.js";
import { buildAnalysisSummary, findAccountAge } from "./analysis.service.js";

function buildOverviewWithAge(overview) {
    return {
        ...overview,
        accountAge: findAccountAge(overview.create_date ?? overview.createDate)
    };
}

async function getStoredUserAnalysis(username) {
    if (!username) {
        const overviews = await findAllOverviews();

        return {
            users: overviews.map(buildOverviewWithAge)
        };
    }

    const overview = await findOverviewByUsername(username);

    if (!overview) {
        throw new Error("No saved analysis found for this username");
    }

    const repos = await findReposByOverviewId(overview.id);

    return buildAnalysisSummary(overview, repos);
}

export { getStoredUserAnalysis };