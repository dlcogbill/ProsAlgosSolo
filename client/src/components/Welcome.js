import { Link } from 'react-router-dom';

function ProjectHome() {
    
    return (
    <div>
        <div className="welcomeBack">
            <a href="https://www.instagram.com/kamakazefilmz/">
                <img src="./welcome03.png" alt="https://www.instagram.com/kamakazefilmz/"/>
            </a>
            <a href="https://www.instagram.com/myteamdope_real_ig/">
                <img src="./welcome01.png" alt="https://www.instagram.com/myteamdope_real_ig/"/>
            </a>
            <a href="https://www.instagram.com/teamidealimage/">
                <img src="./welcome02.png" alt="https://www.instagram.com/teamidealimage/"/>
            </a>
        </div>
        <div className="welcomeFront">
            <Link to="/posts"><h1>Welcome!</h1></Link>
        </div>
    </div>
    );
}

export default ProjectHome;