function getMostUsedLanguage(repos){

    const languageCount = {};

    for(const repo of repos){
        if(!repo.majorLanguage){
            continue;
        }

        languageCount[repo.majorLanguage] = (languageCount[repo.majorLanguage] || 0) + 1;
    }

    let mostUsedLanguage = null;//initially no language is most used lang
    let maxCount = 0;

    for(const language in languageCount){

        if(languageCount[language] > maxCount){

            maxCount = languageCount[language];
            mostUsedLanguage = language;//set most used lang in each iteration and at last will return most used lang
        }
    }

    return {
        language: mostUsedLanguage, 
        repositoryCount: maxCount
    };
}

function findAccountAge(date){
    return new Date().getFullYear() - date.getFullYear(); //calculate how much years old is the account
}
function getLargestProject(repos){
    if(!repos.length){
        return null;
    }
    return repos.reduce(
        (largest,current)=>

            current.size > largest.size
                ? current
                : largest
    );
}

function getLargestProjectByCodeSize(repos) {
    if (!repos.length) {
        return null;
    }

    return repos.reduce((largest, current) => {
        const currentCodeSize = current.codeSize ?? 0;
        const largestCodeSize = largest.codeSize ?? 0;

        return currentCodeSize > largestCodeSize ? current : largest;
    });
}

function getCodeSize(allLanguages) {
    if (!allLanguages || typeof allLanguages !== "object") {
        return 0;
    }

    return Object.values(allLanguages).reduce((total, value) => {
        const numericValue = Number(value);

        return total + (Number.isFinite(numericValue) ? numericValue : 0);
    }, 0);
}

function getPopularRepository(repos) {
    if(!repos.length){
        return null;
    }

    const maxStars = Math.max(
        ...repos.map(repo => repo.starCount)
    );

    if(maxStars === 0){
        return getLargestProjectByCodeSize(repos);
    }

    return repos.reduce(
        (mostPopular,current)=>

            current.starCount >
            mostPopular.starCount

                ? current
                : mostPopular
    );
}
function buildAnalysisSummary(overview, repos) {
    const normalizedRepos = repos.map((repo) => ({
        ...repo,
        majorLanguage: repo.majorLanguage ?? repo.major_language ?? null,
        starCount: repo.starCount ?? repo.star_count ?? 0,
        forkCount: repo.forkCount ?? repo.fork_count ?? 0,
        size: repo.size ?? repo.repoSize ?? repo.repo_size ?? 0,
        allLanguages: typeof (repo.allLanguages ?? repo.all_languages) === "string"
            ? JSON.parse(repo.allLanguages ?? repo.all_languages)
            : (repo.allLanguages ?? repo.all_languages),
        codeSize: getCodeSize(
            typeof (repo.allLanguages ?? repo.all_languages) === "string"
                ? JSON.parse(repo.allLanguages ?? repo.all_languages)
                : (repo.allLanguages ?? repo.all_languages)
        )
    }));

    return {
        overview,
        accountAge: findAccountAge(overview.create_date ?? overview.createDate),
        analysis: {
            mostUsedLanguage: getMostUsedLanguage(normalizedRepos),
            mostPopularRepository: getPopularRepository(normalizedRepos),
            largestByCodeSize: getLargestProjectByCodeSize(normalizedRepos),
            largestRepository: getLargestProject(normalizedRepos),
            totalRepositories: normalizedRepos.length
        },
        repositories: normalizedRepos
    };
}

export {buildAnalysisSummary};