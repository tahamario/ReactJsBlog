import React from 'react'
import Skeleton from 'react-loading-skeleton'
import './PostSkeleton.css'

function PostSkeleton({ cards }) {
    return (
        Array(cards).fill(0).map((item, index) => (
            <div className='card-skeleton' key={index}>
                <div className="left-col">
                    <Skeleton style={{ width: 'auto', height:'100%' }} />
                </div>
                <div className="right-col">
                    <Skeleton style={{ margin: '1rem 0' }} />
                    <Skeleton count={4} style={{ marginBottom: '0.6rem' }} />
                    <Skeleton width={100} height={30} style={{ marginTop: '1rem' }} />
                </div>
            </div>
        ))

    )
}

export default PostSkeleton