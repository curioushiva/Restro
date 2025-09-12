import { Link } from 'react-router'
import "./Footer.css"

const Footer = () => {
    return (
        <div className='footer'>
            <div className='socials'>
                <Link to="https://www.instagram.com/curioushiva/" target="_blank">Instagram</Link>
                <Link to="https://www.linkedin.com/in/curioushiva/" target="_blank">Linkedin</Link>
                <Link to="https://github.com/curioushiva" target="_blank">Github</Link>
            </div>
            <div className='comp'>
                <h1>Restro</h1>
            </div>
            <div className='copyright'>
                <Link>By Curioushiva © 2025</Link>
            </div>
        </div>
    )
}

export default Footer