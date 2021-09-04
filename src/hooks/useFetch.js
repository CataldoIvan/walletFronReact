import { useState, useEffect } from 'react';

const useFetch = (url, requestOptions) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, requestOptions, {mode:'cors'})
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError(null);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [url, requestOptions]);

  return {
    loading,
    error,
    data,
  };
};

export default useFetch;