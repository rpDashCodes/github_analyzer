import pool from "../config/db.js";

await pool.execute(`DROP TABLE IF EXISTS repos`);
await pool.execute(`DROP TABLE IF EXISTS overview`);

await pool.execute(`
CREATE TABLE overview (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    public_repo_count INT NOT NULL,
    follower_count INT NOT NULL,
    create_date DATETIME NOT NULL,
    last_active DATETIME NOT NULL,
    popularity VARCHAR(16)
)`);

await pool.execute(`
CREATE TABLE repos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    overview_id INT NOT NULL,
    repo_name VARCHAR(255) NOT NULL,
    description TEXT,
    star_count INT NOT NULL DEFAULT 0,
    fork_count INT NOT NULL DEFAULT 0,
    major_language VARCHAR(30),
    all_languages JSON,
    repo_created DATETIME NOT NULL,
    repo_updated DATETIME NOT NULL,
    size INT NOT NULL DEFAULT 0,

    CONSTRAINT fk_repos_overview
        FOREIGN KEY (overview_id)
        REFERENCES overview(id)
        ON DELETE CASCADE
)`);
await pool.end();
console.log("Tables created successfully");