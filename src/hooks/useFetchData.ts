import { useState, useEffect, useCallback } from "react";

const useFetchData = <T>(fetchFunction: () => Promise<T | null>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchFunction();
      if (result) {
        setData(result);
      }
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  const refetch = () => {
    setIsLoading(true);
    setData(null);
    setError(null);

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch };
};

export default useFetchData;
