import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import Pagination from '../layouts/Pagination';

function Comments() {
    const [comments, setComments] = useState([{
        name: '',
        body: '',
    }]);

    /*Pagination variables*/
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(4);
    const lastCommentIndex = currentPage * commentsPerPage;
    const firstCommentIndex = lastCommentIndex - commentsPerPage


    useEffect(() => {
        const timer = setTimeout(() => {
            axios.get('https://jsonplaceholder.typicode.com/comments')
                .then(res => {
                    setComments(res.data)
                })
                .catch(err => console.log(err))
        }, 5000);

        return () => clearTimeout(timer);
    }, [])

    const currentComments = comments.slice(firstCommentIndex, lastCommentIndex)

    return (
        <div style={{ margin: '10px 30px' }}>
            {currentComments.map((comment, index) => (
                <div key={index} style={{
                    backgroundColor: '#ebebeb',
                    margin: '10px',
                    padding: '15px',
                    borderRadius: '5px',
                }}>
                    <h1>{comment.name || <Skeleton />}</h1>
                    <p>{comment.body || <Skeleton count={3} />}</p>
                </div>
            ))}

            {comments.length > 1 && <Pagination
                totalItems={comments.length}
                itemsPerPage={commentsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />}
        </div>
    )
}

export default Comments