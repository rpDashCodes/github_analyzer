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
```

Update your `.env` file with the database credentials.

Initialize the database tables:

```bash
npm run init-db
```

This command automatically creates all required tables.

### Start Development Server

```bash
npm run dev
```

---

## API Endpoints

### Analyze GitHub User

Analyzes a GitHub user, stores the data in MySQL, updates existing records if the user has already been analyzed, and returns the latest analysis.

**Endpoint**

```http
GET /api/analyze?username={github_username}
```

**Example**

```http
GET /api/analyze?username=rpDashCodes
```

**Notes**

* `username` query parameter is required.
* If the user already exists in the database, their data is refreshed from GitHub.
* If the user does not exist, a new record is created.

---

### Get Analysis Data

Retrieves previously analyzed data from the database.

**Endpoint**

```http
GET /api/analysis?username={github_username}
```

**Example**

```http
GET /api/analysis?username=rpDashCodes
```

**Notes**

* If `username` is provided, analysis data for that specific user is returned.
* If `username` is omitted, all analyzed GitHub users are returned.

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
