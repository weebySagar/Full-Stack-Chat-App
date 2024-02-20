import { useState, useEffect } from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const fetchData = async (apiFunction,...args) => {
      try {
        setLoading(true);
        const result = await apiFunction(...args);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };


  return { data, loading, error,fetchData };
};

export default useFetch;
