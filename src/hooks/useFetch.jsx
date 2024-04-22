import { useEffect, useState } from "react"

function useFetch({URL, dependency = [], pagination = false, perPage = 4}) {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetchData(URL);
  }, dependency);

  async function fetchData(URL) {
    setLoading(true);
    try {
      const resp = await fetch(URL);
      const data = await resp.json();
      console.log(data);
      setData(data);
      if(pagination) {
        const calTotalPages = Array.from(Array(Math.ceil(data.length / perPage)).keys());
        setTotalPages(calTotalPages);
        if(!calTotalPages) {
          throw new Error('an error occurred in pagination process');
        }
      }
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, setData, loading, error, totalPages };

}

export default useFetch