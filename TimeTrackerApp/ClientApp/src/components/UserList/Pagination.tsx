import React, {FC, useEffect} from 'react';
import usePagination from "../../hooks/usePagination";


const Pagination: FC<{
    contentPerPage: number,
    count: number,
    setFirstContentIndex(index: number): void
}> = ({contentPerPage, count, setFirstContentIndex}) => {
    const {
        firstContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage,
        count,
    })

    useEffect(()=>{
        setFirstContentIndex(firstContentIndex)
    }, [firstContentIndex])

    return <>
        {
            totalPages > 1
            ? <div className="pagination">
                <p className="text">
                    {page}/{totalPages}
                </p>
                <button onClick={() => {
                    prevPage()
                }} className="page">
                    &larr;
                </button>
                {/* @ts-ignore */}
                {[...Array(totalPages).keys()].map((el) => (
                    <button
                        onClick={() => {
                            setPage(el + 1)
                        }}
                        key={el}
                        className={`page ${page === el + 1 ? "active" : ""}`}
                    >
                        {el + 1}
                    </button>
                ))}
                <button onClick={() => {
                    nextPage()
                }} className="page">
                    &rarr;
                </button>
            </div>
            : null
        }
    </>
};

export default Pagination;