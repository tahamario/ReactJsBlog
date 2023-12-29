import React, { useState } from 'react'
import './Pagination.css'

function Pagination({ totalItems, itemsPerPage, setCurrentPage, currentPage }) {
    /*Pagination variables*/
    const [currentPageNbr, setCurrentPageNbr] = useState(1);
    const [nbrPerPage, setNbrPerPage] = useState(10);
    const lastNbrPageIndex = currentPageNbr * nbrPerPage;
    const firstNbrPageIndex = lastNbrPageIndex - nbrPerPage

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }

    const currentpagesnumber = pages.slice(firstNbrPageIndex, lastNbrPageIndex)

    const nextPage = ()=> {
        const currentpagesnumber = pages.slice(firstNbrPageIndex, lastNbrPageIndex)
    }

    return (
        <div className='pagination'>
            <button onClick={() => setCurrentPageNbr(prev => (prev == 1 ? prev : 1))}>&#60; &#60;</button>
            <button onClick={() => setCurrentPageNbr(prev => (prev == 1 ? prev : prev-1))}>&#60;</button>
            {currentpagesnumber.map((page, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={page == currentPage ? "active" : ""}
                >{page}</button>
            ))}
            <button onClick={() => setCurrentPageNbr(prev => (prev == Math.ceil(pages.length / nbrPerPage) ? prev : prev+1))}>&#62;</button>
            <button onClick={() => setCurrentPageNbr(prev => (prev == Math.ceil(pages.length / nbrPerPage) ? prev : Math.ceil(pages.length / nbrPerPage)))}>&#62; &#62;</button>
        </div>
    )
}

export default Pagination