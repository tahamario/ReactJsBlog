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

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const userContext = createContext();

function App() {
  const [user, setUser] = useState({
    email: null,
    username: null,
  })

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/').then(
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
          </Routes>
        </BrowserRouter>
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
