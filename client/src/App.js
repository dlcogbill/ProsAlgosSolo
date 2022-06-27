import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Welcome from './components/Welcome';
import PostList from './components/PostList';
import RegLog from './components/RegLog';
import UserHome from './components/UserHome';
import NewSession from './components/NewSession';
import UpdateSession from './components/UpdateSession';
import ViewSession from './components/ViewSession';
import AdminRegLog from './components/AdminRegLog';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
import AdminHome from './components/AdminHome';

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/posts" element={<PostList isAdmin={isAdmin}/>} />
          <Route path="/reglog" element={<RegLog setLoggedIn={setLoggedIn} />} />
          <Route path="/user/:username" element={<UserHome loggedIn={loggedIn} />} />
          <Route path="/:username/sessions/new" element={<NewSession />} />
          <Route path="/:username/sessions/:id/edit" element={<UpdateSession />} />
          <Route path="/:username/sessions/:id" element={<ViewSession />} />
          {/* Admin Routes */}
          <Route path="/admin/reglog" element={<AdminRegLog setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>} />
          <Route path="/admin/posts/new" element={<NewPost isAdmin={isAdmin}/>} />
          <Route path="/posts/:id/edit" element={<UpdatePost isAdmin={isAdmin}/>} />
          <Route path="/admin/:username" element={<AdminHome isAdmin={isAdmin} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
