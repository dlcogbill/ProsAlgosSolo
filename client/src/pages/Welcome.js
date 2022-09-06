import { Link } from 'react-router-dom';

function ProjectHome() {
    
    return (
    <div>
        <div className="welcomeBack">
            <a href="https://www.instagram.com/kamakazefilmz/">
                <img src="./welcome03a.png"
                    alt="https://www.instagram.com/kamakazefilmz/"
                    onMouseOver={(e) => e.target.src="./welcome03.png" }
                    onMouseOut={(e) => e.target.src="./welcome03a.png" } />
            </a>
            <a href="https://www.instagram.com/myteamdope_real_ig/">
                <img src="./welcome01a.png"
                    alt="https://www.instagram.com/myteamdope_real_ig/"
                    onMouseOver={(e) => e.target.src="./welcome01.png" }
                    onMouseOut={(e) => e.target.src="./welcome01a.png" } />
            </a>
            <a href="https://www.instagram.com/teamidealimage/">
                <img src="./welcome02a.png"
                    alt="https://www.instagram.com/teamidealimage/"
                    onMouseOver={(e) => e.target.src="./welcome02.png" }
                    onMouseOut={(e) => e.target.src="./welcome02a.png" } />
            </a>
        </div>
        <div className="welcomeFront">
            <Link to="/posts"><h1>Welcome!</h1></Link>
        </div>
    </div>
    );
}

export default ProjectHome;