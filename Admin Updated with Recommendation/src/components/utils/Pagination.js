import React, { useState } from 'react';
import './Pagination.css'


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const [appState, changeState] = useState({
        activeObject: null,
        objects: pageNumbers
    })

    const toggleInactive = (index) => {
        changeState({ ...appState, activeObject: appState.objects[index] })
    }
    const toggleActiveStyle = (index) => {
        if (appState.objects[index] === appState.activeObject) {
            return "btn active-pagination"
        }
        else {
            return "btn"
        }
    }

    return (
        <nav className='pagination-main'>
            <ul className='pagination'>
                {pageNumbers.map((number, index) => (
                    <li key={number} className='page-item'>
                        <button key={index} className={toggleActiveStyle(index)} onClick={() => {
                            paginate(number)
                            toggleInactive(index)
                        }}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;