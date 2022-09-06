import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Welcome from './pages/Welcome';
import PostList from './pages/PostList';
import RegLog from './pages/RegLog';
import UserHome from './pages/UserHome';
import NewSession from './pages/NewSession';
import UpdateSession from './pages/UpdateSession';
import ViewSession from './pages/ViewSession';
import AdminRegLog from './pages/AdminRegLog';
import NewPost from './pages/NewPost';
import UpdatePost from './pages/UpdatePost';
import AdminHome from './pages/AdminHome';
import UsersHome from './pages/UsersHome';

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>
        <div className="pageBody">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/posts" element={<PostList isAdmin={isAdmin}/>} />
            <Route path="/reglog" element={<RegLog setLoggedIn={setLoggedIn} />} />
            <Route path="/User/:username" element={<UserHome loggedIn={loggedIn} />} />
            <Route path="/sessions/new" element={<NewSession loggedIn={loggedIn}/>} />
            <Route path="/sessions/:id/edit" element={<UpdateSession loggedIn={loggedIn}/>} />
            <Route path="/sessions/:id" element={<ViewSession loggedIn={loggedIn}/>} />
            {/* Admin Routes */}
            <Route path="/Admin/reglog" element={<AdminRegLog setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>} />
            <Route path="/Admin/posts/new" element={<NewPost isAdmin={isAdmin}/>} />
            <Route path="/posts/:id/edit" element={<UpdatePost isAdmin={isAdmin}/>} />
            <Route path="/Admin/:username" element={<AdminHome isAdmin={isAdmin} />} />
            <Route path="/Admin/users" element={<UsersHome isAdmin={isAdmin} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
