import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Post.css'
import { userContext } from '../App';
import Swal from 'sweetalert2'

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({
        _id: null,
        title: null,
        description: null,
        file: null,
        madeBy: null,
    })
    const user = useContext(userContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/' + id)
            .then(post => {
                if (post.data.status == 200) {
                    setPost(post.data.data);
                } else if (post.data.status == 401) {
                    console.log(post.data.error);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to deleted?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d40834",
            cancelButtonColor: "#508D69",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:3001/delete/' + id)
                    .then(res => {
                        if (res.data.status == 200) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Post has been deleted.",
                                icon: "success"
                            }).then(() => navigate('/'))
                        } else if (res.data.status == 401) {
                            console.log(res.data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }

    return (
        <div>
            {post.title && <div className='post_post_container'>
                <div className='post_post_card'>
                    <div className='post_post_img'>
                        <img src={`http://localhost:3001/images/${post.file}`} alt={`post image`} />
                    </div>
                    <div className='post_post_text'>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                    </div>
                    {
                        post.madeBy == user.email ?
                            <div className='post_post_btn'>
                                <Link to={`/edit/${post._id}`} className='post_edit_btn'>Edit</Link>
                                <button onClick={() => handleDelete(post._id)} className='post_delete_btn'>Delete</button>
                            </div>
                            : null
                    }

                </div>
            </div>}
        </div>
    )
}

export default Post