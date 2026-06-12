# GitHub Analyzer API

A Node.js and MySQL based backend application that analyzes public GitHub profiles and repositories, stores the analyzed data in a MySQL database, and provides summarized insights about a user's GitHub activity.

## Features

* Analyze any public GitHub user
* Store analyzed data in MySQL
* Update existing records automatically
* Repository language analysis
* Most used language detection
* Largest repository detection
* Most popular repository detection
* Account age calculation
* Transaction-based database updates

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-analyser
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file in the project root.

```env
SRV_PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

GITHUB_TOKEN=your_github_personal_access_token
```

### Create Database

Create a MySQL database.

```sql
CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE overview (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    public_repo_count INT NOT NULL,
    follower_count INT NOT NULL,
    create_date DATETIME NOT NULL,
    last_active DATETIME NOT NULL,
    popularity VARCHAR(16)
);

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
);
```

Run the provided table creation scripts.

### Start Development Server

```bash
npm run dev
```

---

## API Endpoints

### Analyze GitHub User

Fetches data from GitHub, stores it in MySQL, and returns analysis results.

```http
GET /api/analyze?username=yourUsername 
```

Example:

```http
GET /api/analyze?username=rpDashCodes
```

---

### Get Stored Analysis

Retrieves previously analyzed data from the database.

```http
GET /api/analysis?gitId=username
```

Example:

```http
GET /api/analysis?gitId=rpDashCodes
```

---

## Response Structure

```json
{
  "overview": {},
  "accountAge": 0,
  "analysis": {
    "mostUsedLanguage": {},
    "largestRepository": {},
    "mostPopularRepository": {},
    "totalRepositories": 0
  },
  "repositories": []
}
```

---

## Environment Variables

| Variable     | Description                  |
| ------------ | ---------------------------- |
| SRV_PORT     | Server port                  |
| DB_HOST      | MySQL host                   |
| DB_USER      | MySQL username               |
| DB_PASSWORD  | MySQL password               |
| DB_NAME      | Database name                |
| GITHUB_TOKEN | GitHub Personal Access Token |

---

## Project Structure

```text
config/
controllers/
dao/
routes/
services/

index.js
package.json
```

---

## Author

Rudra Prasad Dash
