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
            all_languages,
            repo_created,
            repo_updated
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            overviewId,
            repo.repoName,
            repo.description,
            repo.starCount,
            repo.forkCount,
            repo.majorLanguage,
            JSON.stringify(repo.allLanguages),
            repo.repoCreated,
            repo.repoUpdated
        ]
    );
}
export {createRepo, deleteReposByOverviewId};