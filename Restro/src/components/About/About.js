import { Link } from "react-router";
import { RiArrowDropDownLine, RiEyeLine, RiGitForkLine, RiGlobalLine, RiInstagramLine, RiLinkedinBoxFill, RiMapPinLine, RiStarLine, RiTeamLine } from "@remixicon/react"
import { useState } from "react";
import useAbout from "../../hooks/abouthook/useAbout.js";
import AboutSu from "./Shimmer/AboutSu.js";
import "./About.css"

const About = () => {
    const [userGitData, repoGitData, GitHubData, SULoader] = useAbout();
    const [devShow, setdevShow] = useState(false)
    const [svgToggle, setsvgToggle] = useState("svgToggle")
    const [hasFetched, setHasFetched] = useState(false)
    const { login, name, bio, avatar_url, location, followers, blog } = userGitData;

    const restroRepo = repoGitData.filter((val) => {
        return val.name === "Restro"
    })

    const aboutDevToggle = () => {
        if (devShow === false) {
            setdevShow(true)
            setsvgToggle("svgToggle svgToggle2")

            if (hasFetched === false) {
                GitHubData()
                setHasFetched(true)
            }

        } else {
            setdevShow(false)
            setsvgToggle("svgToggle")
        }
    }

    return (
        <div>
            <div className="aboutus">
                <div className="aboutRes">
                    <div className="aboutR-up">
                        <h1>About Us</h1>
                        <p>Restro is a modern food ordering app that makes finding and enjoying your favorite meals easy and hassle-free.
                            From curated restaurants across cities to detailed menus and smooth ordering, we bring great food and convenience
                            straight to your fingertips
                        </p>
                        <button><Link to="/">Explore More</Link></button>
                    </div>
                    <div className="aboutR-dn">
                        <div className="reviews">
                            <div className="reviewCont">
                                <h1>10K+ Orders</h1>
                                <p>Delivered with love</p>
                            </div>
                            <div className="reviewCont">
                                <h1>5K+ Customers</h1>
                                <p>Happy foodies served</p>
                            </div>
                            <div className="reviewCont">
                                <h1>1K+ Restaurants</h1>
                                <p>Curated across cities</p>
                            </div>
                            <div className="reviewCont">
                                <h1>4.8★ Rating</h1>
                                <p>Trusted by our users</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="aboutDev">
                    <div className="aboutD-H" onClick={aboutDevToggle}>
                        <h1>Curious about developer ? Know from here →</h1>
                    </div>
                    {devShow ? (SULoader ?
                        <div className="aboutDW">
                            <div className="aboutDW-up">
                                <div className="aDWU-1">
                                    <div className="overview">
                                        <h1>Overview</h1>
                                    </div>
                                </div>
                                <div className="aDWU-2">
                                    <div className="userinfo">
                                        <Link to="https://www.github.com/curioushiva/" target="_blank">
                                            <img src={avatar_url} />
                                            <div className="username">
                                                <h2>{name} </h2>
                                                <h3>{login}</h3>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="userbio">
                                        <h2>{bio}</h2>
                                    </div>
                                    <div className="usersocials">
                                        <Link>
                                            <RiMapPinLine />
                                            {location}
                                        </Link>
                                        <Link to={blog}>
                                            <RiGlobalLine />
                                            Website
                                        </Link>
                                        <Link to="https://www.instagram.com/curioushiva/" target="_blank">
                                            <RiInstagramLine />
                                            curioushiva
                                        </Link>
                                        <Link to="https://www.linkedin.com/in/curioushiva/" target="_blank">
                                            <RiLinkedinBoxFill />
                                            in/curioushiva
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="aboutDW-dn">
                                <div className="aDWD-1">
                                    <div className="heading">
                                        <h1>Restro App Github Repo</h1>
                                    </div>
                                </div>
                                <div className="aDWD-2">

                                    <div className="reponame">
                                        <Link to="https://github.com/curioushiva/Restro" target="_blank">
                                            <h2>{restroRepo?.[0]?.name}</h2>
                                            <h3>Food App</h3>
                                        </Link>
                                    </div>
                                    <div className="repoabout">
                                        <Link to="https://github.com/curioushiva/Restro" target="_blank">
                                            <p>{restroRepo?.[0]?.description}</p>
                                        </Link>
                                    </div>

                                    <div className="repoinfo">
                                        <div className="rpcard">
                                            <RiTeamLine />
                                            <h3>{followers} Followers</h3>
                                        </div>
                                        <div className="rpcard">
                                            <RiGitForkLine />
                                            <h3>{restroRepo?.[0]?.forks_count} Forks</h3>
                                        </div>
                                        <div className="rpcard">
                                            <RiStarLine />
                                            <h3>{restroRepo?.[0]?.stargazers_count} Stars</h3>
                                        </div>

                                        <div className="rpcard">
                                            <RiEyeLine />
                                            <h3>{restroRepo?.[0]?.watchers_count} Watches</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <AboutSu />) : null}
                </div>
            </div>
        </div >
    )

}

export default About;