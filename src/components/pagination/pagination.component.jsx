/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";

const Pagination = ({onChange, limit, offset, totalCount}) => {
    
    const updatePagination = (newPage) => {
        onChange(newPage);
    }

    const pagesNum = Math.ceil(totalCount/limit);
    const selectedPage = offset/limit;

    return (
        <nav className="lbh-simple-pagination">
            { pagesNum > 1 &&
            <React.Fragment>
                <a 
                    className={`lbh-simple-pagination__link lbh-simple-pagination__link--previous ${selectedPage === 0 ? "disabled" : ""}`}
                    href="#"
                    onClick={() => {updatePagination(selectedPage-1)}}
                >
                    <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
                    <path d="M10 1L2 9.5L10 18" strokeWidth="2" />
                    </svg>
                    Previous page
                    <span className="lbh-simple-pagination__title previous">{selectedPage} of {pagesNum}</span>
                </a>
                <a
                    className={`lbh-simple-pagination__link lbh-simple-pagination__link--next ${selectedPage === pagesNum-1 ? "disabled" : ""}`}
                    href="#"
                    onClick={() => {updatePagination(selectedPage+1)}}
                >
                    Next page
                    <span className="lbh-simple-pagination__title next">{selectedPage+2} of {pagesNum}</span>
                    <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
                    <path d="M1 18L9 9.5L1 1" strokeWidth="2" />
                    </svg>
                </a> 
            </React.Fragment>}
        </nav>
    );
}

export default Pagination;