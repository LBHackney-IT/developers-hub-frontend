
const Pagination = ({selectedPage, limit, offset, totalResults}) => {
    
    const pagesNum = Math.ceil(totalResults/limit);

    const links = [];
    for(var pageNum = 1; pageNum <= pagesNum; pageNum++){
        const link = (
            <li className="lbh-pagination__item" key={pageNum}>
                <a 
                className={`lbh-pagination__link ${pageNum === selectedPage ? "lbh-pagination__link--current" : ""}`}
                href="#" 
                aria-current="true"
                aria-label={`Page ${pageNum}`}>{pageNum}
                </a>
            </li>);
        links.push(link);
    }

    return (
        <nav className="lbh-pagination">
            <div className="lbh-pagination__summary">Showing {offset+1}-{offset+limit} of {totalResults} results</div>
            <ul className="lbh-pagination">
                <li className="lbh-pagination__item">
                    <a className="lbh-pagination__link" href="#" aria-label="Previous page">
                        <span aria-hidden="true" role="presentation">&laquo;</span>
                        Previous
                    </a>
                </li>
                {links}
                <li className="lbh-pagination__item">
                    <a className="lbh-pagination__link" href="#" aria-label="Next page">
                        Next
                        <span aria-hidden="true" role="presentation">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;