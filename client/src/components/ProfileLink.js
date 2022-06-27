function ProfileLink(props) {
    const {link, thumbnail, alias} = props;
    return (
    <div className="profileLink">
        <a href={link} alt={link} target="_blank">
            <img className="profileLinkImg" src={thumbnail} alt={link}/>
            <p>{alias}</p>
        </a>
    </div>
    );
}

export default ProfileLink;