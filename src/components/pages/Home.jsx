import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/getposts')
            .then((posts) => {
                if (posts.data.status == 200) {
                    setPosts(posts.data.data);
                } else if (posts.data.status == 401) {
                    console.log(posts.data.error);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className='home_post_container'>
            <h1>Home</h1>
            {posts.length > 0 && posts.map((post, index) => (
                <div key={index} className='post_card'>
                    <div className='post_img'>
                        <img src={`http://localhost:3001/images/${post.file}`} alt={`post ${index + 1} image`} />
                    </div>
                    <div className='post_card_2ndside'>
                        <div className='post_text'>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                        </div>
                        <Link to={`/post/${post._id}`} className='home_post_btn'>Read More</Link>
                    </div>

                </div>
            ))}
        </div>

    )
}

export default Home