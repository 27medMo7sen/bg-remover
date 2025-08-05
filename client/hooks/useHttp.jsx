import axios from "axios";
import React from "react";
import { useCallback } from "react";

export const useHttp = () => {
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";
  }, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const refresh = useCallback(() => {
    setIsLoading(false);
    const response = axios.get("/auth/refresh-token");
    console.log("Token refreshed successfully:", response.data);
    localStorage.setItem("token", response.data.token);
    return response;
  }, []);
  const get = useCallback(async (url, config = {}) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url, config);
      console.log("GET request successful:", response.data);
      setError(null);
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      if (error.response && error.response.status === 402) {
        await refresh();
        get(url, config);
      }
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const post = useCallback(async (url, data, config = {}) => {
    try {
      setIsLoading(true);
      const response = await axios.post(url, data, config);
      console.log("POST request successful:", response.data);
      setError(null);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      if (error.response && error.response.status === 402) {
        await refresh();
        post(url, data, config);
      }
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const put = useCallback(async (url, data, config = {}) => {
    try {
      setIsLoading(true);
      const response = await axios.put(url, data, config);
      console.log("PUT request successful:", response.data);
      setError(null);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", error);
      if (error.response && error.response.status === 402) {
        await refresh();
        put(url, data, config);
      }
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const del = useCallback(async (url, config = {}) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(url, config);
      console.log("DELETE request successful:", response.data);
      setError(null);
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      if (error.response && error.response.status === 402) {
        await refresh();
        del(url, config);
      }
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { get, post, put, del, isLoading, error, setError, setIsLoading };
};
