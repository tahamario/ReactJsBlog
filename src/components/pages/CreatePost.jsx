import React, { useContext, useState } from 'react'
import './CreatePost.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { toast } from 'react-toastify';

function CreatePost() {
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        file: '',
    })

    const user = useContext(userContext);

    const navigate = useNavigate();

    const validation = () => {
        if (postData.title == '') {
            toast.error('Title field is required', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return false;
        } else if (postData.description == '') {
            toast.error('Description field is required', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return false;
        } else if (postData.file == '') {
            toast.error('Please chose a file', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();

        if (isValid) {
            const formData = new FormData()
            formData.append('title', postData.title);
            formData.append('description', postData.description);
            formData.append('file', postData.file);
            formData.append('madeBy', user.email);

            axios.post('https://feelfreeblog-back.onrender.com/create', formData)
                .then((res) => {
                    if (res.data.status == 401) {
                        toast.error(res.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    } else if (res.data.status == 200) {
                        toast.success(res.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                        navigate('/')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='post_container'>
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <input type='text' className='title' id='title' placeholder='Entre post title'
                    onChange={(e) => setPostData(prev => ({ ...prev, [e.target.id]: e.target.value }))} />
                <textarea name='description' id='description' cols='30' rows='10'
                    className='description'
                    placeholder='Entre a description'
                    onChange={(e) => setPostData(prev => ({ ...prev, [e.target.id]: e.target.value }))}>
                </textarea>
                <input type="file" className='file' id='file'
                    onChange={(e) => setPostData(prev => ({ ...prev, [e.target.id]: e.target.files[0] }))} />
                <button className='post_btn'>Post</button>
            </form>
        </div>
    )
}

export default CreatePost