import { useState } from "react"
import { userGithubApi, userGithubRepoApi } from "../../utils/ConstData"


const useAbout = () => {

    const [userGitData, setuserGitData] = useState([])
    const [repoGitData, setrepoGitData] = useState([])

    const [SULoader, setSULoader] = useState(false)

    const GithubData = async () => {
        const userData = await fetch(`${userGithubApi}`)
        const repoData = await fetch(`${userGithubRepoApi}`)
        const userJson = await userData.json()
        const repoJson = await repoData.json()
        setuserGitData(userJson)
        setrepoGitData(repoJson)
        setTimeout(() => { setSULoader(true) }, 1000)

    }

    return (
        [userGitData, repoGitData, GithubData, SULoader]

    )
}

export default useAbout;