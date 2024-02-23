import Link from "next/link"
const Pagination = ({currentPage, pageQty}) => {
    const isFirst = currentPage === 1
    const isLast = currentPage === pageQty
    const previousPage = `/blog/page/${currentPage - 1}`
    const nextPage = `/blog/page/${currentPage + 1}`
    if(pageQty === 1) {
        return <></>
    }else {
        return (
          <ul className="flex pl-0 list-none my-2">
            {!isFirst && (
                <Link
                    href={previousPage}
                    className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
                >Previous</Link>
            )}
            {Array.from({length: pageQty}, (_, i) => (
                <Link key={i + 1}
                    href={`/blog/page/${i + 1}`}
                    className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
                >{i + 1}</Link>

            ))}
            {!isLast && (
                <Link
                    href={nextPage}
                    className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
                >Next</Link>
            )}
          </ul>
        )
    }
}
export default Pagination