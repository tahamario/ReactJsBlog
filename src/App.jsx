import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import axios from 'axios';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import EditPost from './components/EditPost';
//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from './components/About';

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
