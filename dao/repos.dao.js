import pool from "../config/db.js";
async function deleteReposByOverviewId(connection,overviewId) {
    await connection.execute(`DELETE FROM repos WHERE overview_id = ?`,[overviewId]);
}
async function createRepo(connection, overviewId, repo) {
    await connection.execute(
        `
        INSERT INTO repos(
            overview_id,
            repo_name,
            description,
            star_count,
            fork_count,
            major_language,
            size,
            all_languages,
            repo_created,
            repo_updated
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            overviewId,
            repo.reponame,
            repo.description,
            repo.starCount,
            repo.forkCount,
            repo.majorLanguage,
            repo.size,
            JSON.stringify(repo.allLanguages),
            repo.repoCreated,
            repo.repoUpdated
        ]
    );
}

async function findReposByOverviewId(overviewId) {
    const [rows] = await pool.execute(
        `
        SELECT *
        FROM repos
        WHERE overview_id = ?
        `,
        [overviewId]
    );

    return rows;
}

export {createRepo, deleteReposByOverviewId, findReposByOverviewId};