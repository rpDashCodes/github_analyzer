import pool from "../config/db.js";

import {createRepo, deleteReposByOverviewId} from "../dao/repos.dao.js"
import {findOverviewByUsername, createOverview, updateOverview} from "../dao/overview.dao.js"
import {buildAnalysisSummary} from "./analysis.service.js";

function anlyzePopularity(followerCount){
    if(followerCount <100){
        return "Very Low"
    }else if(followerCount >= 100 && followerCount < 300){
        return "Low"
    }else if(followerCount >= 300 && followerCount < 500){
        return "Average"
    }else if(followerCount >= 500 && followerCount < 1000){
        return "Popular"
    }else if(followerCount >= 1000 && followerCount < 5000){
        return "Very Popular";
    }else{
        return "GitHub Star";
    }
}

async function fetchLanguage(url){
    const controller = new AbortController();
    const timeOutId = setTimeout(() => {  
        controller.abort();
    }, 5000);
    try{
        const response = await fetch(url,{signal:controller.signal});
        if(!response.ok){
            throw new Error("Cant get languages data from git hub");
        }
        return await response.json();
    }catch(error){
        throw error;
    }finally{
        clearTimeout(timeOutId);
    }
}

async function fetchRepos(url){
const controller = new AbortController();

    const timeOutId = setTimeout(() => {
        controller.abort();
    }, 5000);
    try{
        const response = await fetch(url,{signal:controller.signal});
        if(!response.ok){
            throw new Error(response.statusText)
        }
        const reposData = await response.json();
        return reposData;
    }catch(error){
        throw error;
    }finally{
        clearTimeout(timeOutId);
    }
}
async function fetchGitData(id){
    const controller = new AbortController();

    const timeOutId = setTimeout(() => {
        controller.abort();
    }, 5000);
    try{
        const response = await fetch(`https://api.github.com/users/${id}`,{signal:controller.signal});
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return await response.json();
         
    }catch(error){
        throw error;
    }finally{
        clearTimeout(timeOutId);
    }
}
async function analyzeUser(id){
    let connection;
    try{
        const userData = await fetchGitData(id);
        const analyzedUser = {
            "username":userData.login,
            "publicRepoCount":userData.public_repos,
            "followerCount":userData.followers,
            "createDate":new Date(userData.created_at),
            "lastActive":new Date(userData.updated_at),
            "popularity":anlyzePopularity(userData.followers)
        }
        const reposRespons = await fetchRepos(userData.repos_url);
        const analyzedRepos = await Promise.all(
            reposRespons.map(async (repo)=>{
             const languages = await fetchLanguage(repo.languages_url);
           return {
                "reponame":repo.name,
                "description":repo.description,
                "starCount":repo.stargazers_count,
                "forkCount":repo.forks_count,
                "majorLanguage":repo.language,
                "size":repo.size,
                "allLanguages":languages,
                "repoCreated":new Date(repo.created_at),
                "repoUpdated":new Date(repo.updated_at)
            }
        }));
        connection = await pool.getConnection();
        const existingUser = await findOverviewByUsername(analyzedUser.username);
        await connection.beginTransaction();
        let overviewId;
        if(existingUser){
            overviewId = existingUser.id;
            await updateOverview(connection,overviewId,analyzedUser);
            await deleteReposByOverviewId(connection, overviewId);
            await Promise.all(
                analyzedRepos.map( (repo)=>
                     createRepo(connection, overviewId, repo)
                ));
        }else{
            overviewId = await createOverview(connection, analyzedUser);
            await Promise.all(
                analyzedRepos.map((repo)=>
                     createRepo(connection, overviewId, repo)
                )
            );
        }
        await connection.commit();
        const data = buildAnalysisSummary(analyzedUser, analyzedRepos);

        return data;

    }catch(error){
        if(connection){
            await connection.rollback();
        }
        throw error;
    }finally{
        if(connection){
         connection.release();
        }
    }

}
export {analyzeUser};