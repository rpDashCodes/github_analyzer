import pool from "../config/db.js";

import {createRepo, deleteReposByOverviewId} from "../dao/repos.dao.js"
import {findOverviewByUsername, createOverview, updateOverview} from "../dao/overview.dao.js"

async function fetchRepos(url){
const controller = new AbortController();

    const timeOutId = setTimeout(() => {
        controller.abort();
    }, 1000);
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
    }, 2000);
    try{
        const response = await fetch(`https://api.github.com/users/${id}`,{signal:controller.signal});
        if(!response.ok){
            throw new Error(response.statusText)
        }
        const userData = await response.json();
        const repoData = await fetchRepos(userData.repos_url);
        return ({"userData":userData,"repos":repoData});
    }catch(error){
        throw error;
    }finally{
        clearTimeout(timeOutId);
    }
}
export {fetchGitData};