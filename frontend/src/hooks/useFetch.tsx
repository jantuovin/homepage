import { useState, useEffect } from "react";

interface UseFetch<T> {
  doFetch: () => void;
  loading: boolean;
  data: T | null;
  error: any | null;
}

const useFetch = <T,>(url: string): UseFetch<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any | null>(null);

  let abortController: AbortController | null = null;

  useEffect(() => {
    return () => {
      if (abortController) abortController.abort();
    };
  }, []);

  const doFetch = async () => {
    setLoading(true);
    abortController = new AbortController();

    try {
      const response = await fetch(url, {
        signal: abortController.signal,
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
    abortController = null;
  };

  return { doFetch, loading, data, error };
};

export default useFetch;
