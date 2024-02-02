function PagingBar({ pageInfo, setCurrentPage }) {

    // const pageNumber = [...Array(pageInfo.endPage - pageInfo.startPage + 1).keys()]
    //                                 .map(key => key + pageInfo.startPage);

    const pageNumber = [];

    for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }


    return (
        <ul className="paging-ul">
            <li>
                <div
                    className="paging-btn"
                    onClick={ () => setCurrentPage(pageInfo.currentPage - 1) }
                    disabled={ pageInfo.currentPage <= 1 }
                >
                    <img src="/images/arrow-point-to-right.png"/>
                </div>
            </li>
            {
                pageNumber.map(num => (
                    <li key={num}>
                        <div
                            className="paging-btn"
                            style={ pageInfo.currentPage === num ? { backgroundColor : '#C9C5F0 '} : null }
                            onClick={ () => setCurrentPage(num) }
                            disabled={ pageInfo.currentPage === num }
                        >
                            {num}
                        </div>
                    </li>
                ))
            }
            <li>
                <div
                    className="paging-btn"

                    onClick={ () =>
                        setCurrentPage(pageInfo.currentPage + 1) }
                    disabled={ pageInfo.currentPage >= pageInfo.maxPage }
                >
                    <img src="/images/arrow-point-to-right2.png"/>
                </div>
            </li>
        </ul>
    );
}

export default PagingBar;