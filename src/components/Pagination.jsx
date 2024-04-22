import React, { useEffect, useState } from 'react'

function Pagination({perPage = 4, products, setProductsByPage}) {

  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    changePageData();
    const calTotalPages = Array.from(Array(Math.ceil(products.length / perPage)).keys());
    setTotalPages(calTotalPages);
  }, [products, currentPage]);

  function changePageData() {
    const endIndex = currentPage * perPage;
    const startIndex = endIndex - perPage;
    setProductsByPage(products.slice(startIndex, endIndex));
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
    }, 200);
  }

  return (
    <div className="mt-36 flex justify-center gap-2"> 
      {totalPages && totalPages.map(num => {
        num += 1;
        return (
          <button className={`py-3 px-5 rounded ${num === currentPage ? 'bg-darkblue' : 'bg-blue-500'} text-white font-medium text-sm hover:opacity-75 transition duration-200 focus:ring-2 disabled:opacity-90`} key={num} onClick={() => setCurrentPage(num)} disabled={num === currentPage}>{num}</button>
        )
      })}
    </div>
  )
}

export default Pagination