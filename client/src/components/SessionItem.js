import { useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { NavLink} from 'react-router-dom';
import DeleteSession from '../components/DeleteSession';

function SessionItem({ session }) {
  let payload = {};
  useEffect(() => {
    try {
      console.log(Cookies.get('userToken'));
      const userToken = Cookies.get('userToken');
      
      if (userToken) {
          payload = jwt(userToken);
          console.log(payload);
      } else {
          throw "no token";
      }
  }
  catch (err) {
      console.log(err);
  }
},[]);
  return (
    <div className="sessionListItem">
      <p>{session.sessionName}</p>
      <p>Date: { new Date(session.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
      <p>Type: {session.sessionType}</p>
      <p>Status: {session.status}</p>
      <p>Description: {session.desc}</p>
      <p>Location Name: {session.locationName}</p>
      <div>
          <NavLink to={`/sessions/${session._id}/edit`}>Edit</NavLink>
          <DeleteSession id={session._id} username={payload.userName}/>
      </div>
    </div>
  );
}

export default SessionItem;