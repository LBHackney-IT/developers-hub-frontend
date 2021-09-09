
const Pagination = ({onChange, limit, offset, totalCount}) => {
    
    const updatePagination = (newPage) => {
        onChange(newPage);
    }

    const pagesNum = Math.ceil(totalCount/limit);
    const selectedPage = offset/limit;

    const links = [];
    for(var pageNum = 0; pageNum < pagesNum; pageNum++){
        const link = (
            <li className="lbh-pagination__item" key={pageNum}>
                <a 
                id={"pagination-link-"+pageNum}
                className={`lbh-pagination__link ${pageNum === selectedPage ? "lbh-pagination__link--current" : ""}`}
                href="#" 
                aria-current="true"
                aria-label={`Page ${pageNum+1}`}
                onClick={(event) => {updatePagination(event.target.id.replace("pagination-link-", ""))}}
                >
                    {pageNum+1}
                </a>
            </li>);
        links.push(link);
    }

    return (
        <nav className="lbh-pagination">
            <div className="lbh-pagination__summary">Showing {offset+1}-{ offset+limit > totalCount ? totalCount : offset+limit} of {totalCount} result{totalCount !== 1 && "s"}</div>
            { pagesNum > 1 &&
                <ul className="lbh-pagination">
                    { selectedPage !== 0 &&
                        <li className="lbh-pagination__item">
                            <a 
                            className="lbh-pagination__link"
                            href="#" aria-label="Previous page"
                            onClick={() => {updatePagination(selectedPage-1)}}
                            >
                                <span aria-hidden="true" role="presentation">&laquo;</span>
                                Previous
                            </a>
                        </li>
                    }
                    {links}
                    { selectedPage !== pagesNum-1 &&
                        <li className="lbh-pagination__item">
                            <a
                            className="lbh-pagination__link" 
                            href="#"
                            aria-label="Next page"
                            onClick={() => {updatePagination(selectedPage+1)}}
                            >
                                Next
                                <span aria-hidden="true" role="presentation">&raquo;</span>
                            </a>
                        </li>
                    }
                </ul>
            }
        </nav>
    );
}

export default Pagination;