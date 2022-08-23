import React, {FC, useEffect} from 'react';
import usePagination from "../../hooks/usePagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

type PaginationPropsType = {
    contentPerPage: number,
    count: number,
    setFirstContentIndex(index: number): void
}

const Pagination: FC<PaginationPropsType> = (props) => {

    const { contentPerPage, count, setFirstContentIndex } = props
    const { firstContentIndex, nextPage, prevPage, page, setPage, totalPages } = usePagination({contentPerPage, count})

    useEffect(()=>{
        setFirstContentIndex(firstContentIndex)
    }, [firstContentIndex])

    return totalPages > 1 ? (
        <div className="pagination">
            <button onClick={() => prevPage()} className="page">
                <FontAwesomeIcon icon={faAngleLeft} className={'icon'} />
            </button>
            {
                Array.from(Array(totalPages).keys()).map(index => (
                    <button onClick={() => setPage(index + 1)} key={index + 1} className={`button page ${page === index + 1 ? "active" : ""}`}>
                        {index + 1}
                    </button>
                ))
            }
            <button onClick={() => nextPage()} className={"page"}>
                <FontAwesomeIcon icon={faAngleRight} className={'icon'} />
            </button>
        </div>
    ) : <></>
}

export default Pagination;