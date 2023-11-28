import React, { useEffect, useState } from 'react'
import './EditPost.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditPost() {
    const { id } = useParams()
    const [post, setPost] = useState({
        _id: null,
        title: null,
        description: null,
        file: null,
    })

    const [imgLink, setImagLink] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/' + id)
            .then(post => {
                if (post.data.status == 200) {
                    setPost(post.data.data);
                    setImagLink(`http://localhost:3001/images/${post.data.data.file}`);
                } else if (post.data.status == 401) {
                    console.log(post.data.message);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('id', id);
        formData.append('title', post.title);
        formData.append('description', post.description);
        formData.append('file', post.file);

        axios.put('http://localhost:3001/edit', formData)
            .then((res) => {
                if (res.data.status == 200) {
                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    const onSelectFile = (e) => {
        setPost(prev => ({ ...prev, [e.target.id]: e.target.files[0] }))
        setImagLink(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className='post_container'>
            {post._id && <form onSubmit={handleSubmit}>
                <h2>Update Post</h2>
                <img src={imgLink} alt='post image' className='edit_post_img' />
                <label>
                    Select file :
                    <input type="file" className='file' id='file'
                        onChange={onSelectFile} />
                </label>
                <label>
                    Title :
                    <input type='text' className='title' id='title' placeholder='Entre post title'
                        value={post.title}
                        onChange={(e) => setPost(prev => ({ ...prev, [e.target.id]: e.target.value }))} />
                </label>
                <label>
                    description :
                    <textarea name='description' id='description' cols='30' rows='10'
                        className='description'
                        value={post.description}
                        placeholder='Entre a description'
                        onChange={(e) => setPost(prev => ({ ...prev, [e.target.id]: e.target.value }))}>
                        {post.description}
                    </textarea>
                </label>
                <button className='edit_post_btn'>Update</button>
            </form>}
        </div>
    )
}

export default EditPost