import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Pagination from '../layouts/Pagination'
import PostSkeleton from '../layouts/PostSkeleton'

function Home() {
    const [posts, setPosts] = useState([])

    /*Pagination variables*/
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage

    useEffect(() => {
        const timeIntvl = setInterval(() => {
            axios.get('https://feelfreeblog-back.onrender.com/getposts')
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
        }, 5000)

        return () => clearInterval(timeIntvl);
    }, [])

    const currentPosts = posts.slice(firstPostIndex, lastPostIndex)

    return (
        <div className='home_post_container'>
            <h1>Home</h1>
            {posts.length < 2 && <PostSkeleton cards={postsPerPage} />}
            {currentPosts.map((post, index) => (
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
            {posts.length > 1 && <Pagination
                totalItems={posts.length}
                itemsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />}
        </div>

    )
}

export default Home