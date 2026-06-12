import pool from "../config/db.js";

async function findOverviewByUsername(username) {
    const [rows] = await pool.execute(
        `
        SELECT * FROM overview WHERE username = ?`,[username]
    );
    return rows[0];
}

async function findAllOverviews() {
    const [rows] = await pool.execute(
        `
        SELECT *
        FROM overview
        ORDER BY id DESC
        `
    );

    return rows;
}

async function createOverview(connection, data) {
    const [result] = await connection.execute(
        `
        insert into overview(
            username,
            public_repo_count,
            follower_count,
            create_date,
            last_active,
            popularity
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            data.username,
            data.publicRepoCount,
            data.followerCount,
            data.createDate,
            data.lastActive,
            data.popularity
        ]
    );

    return result.insertId;
}

async function updateOverview(connection, id, data) {
    await connection.execute(
        `
        UPDATE overview
        SET
            public_repo_count = ?,
            follower_count = ?,
            create_date = ?,
            last_active = ?,
            popularity = ?
        WHERE id = ?
        `,
        [
            data.publicRepoCount,
            data.followerCount,
            data.createDate,
            data.lastActive,
            data.popularity,
            id
        ]
    );
}
export {findOverviewByUsername, findAllOverviews, createOverview, updateOverview};