import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import axios from 'axios';
import CreatePost from './components/pages/CreatePost';
import Post from './components/pages/Post';
import EditPost from './components/pages/EditPost';
import About from './components/pages/About';
import Comments from './components/pages/Comments';

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from 'react-loading-skeleton';


export const userContext = createContext();

function App() {
  const [user, setUser] = useState({
    email: null,
    username: null,
  })

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('https://feelfreeblog-back.onrender.com/').then(
      (res) => {
        setUser({
          email: res.data.email,
          username: res.data.username,
        })
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }, [])
  return (
    <>
      <userContext.Provider value={user}>
        <SkeletonTheme baseColor="#7b7979" highlightColor="#8d8c8c">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create' element={<CreatePost />} />
              <Route path='/post/:id' element={<Post />} />
              <Route path='/edit/:id' element={<EditPost />} />
              <Route path='/about' element={<About />} />
              <Route path='/comments' element={<Comments />} />
            </Routes>
          </BrowserRouter>
        </SkeletonTheme>
      </userContext.Provider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  )
}

export default App
