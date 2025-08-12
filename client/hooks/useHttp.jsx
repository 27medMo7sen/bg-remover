import { setToken } from "@/lib/slices/authSlice";
import axios from "axios";
import React from "react";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

export const useHttp = () => {
  const dispatch = useDispatch();
  const isRefreshing = useRef(false);
  const failedQueue = useRef([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const processQueue = (error, token = null) => {
    failedQueue.current.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    failedQueue.current = [];
  };

  const refresh = useCallback(async () => {
    if (isRefreshing.current) {
      // If already refreshing, return a promise that will resolve when refresh completes
      return new Promise((resolve, reject) => {
        failedQueue.current.push({ resolve, reject });
      });
    }

    isRefreshing.current = true;

    try {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        throw new Error("No token available for refresh");
      }

      const response = await axios.post("/auth/refresh-token", {
        token: currentToken,
      });

      const newToken = response.data.token;

      if (!newToken) {
        throw new Error("No new token received from refresh");
      }

      localStorage.setItem("token", newToken);
      dispatch(setToken(newToken));
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      console.log("Token refreshed successfully");
      processQueue(null, newToken);

      return newToken;
    } catch (error) {
      console.error("Token refresh failed:", error);

      // Clear invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];

      processQueue(error, null);
      throw error;
    } finally {
      isRefreshing.current = false;
    }
  }, [dispatch]);

  const makeRequest = useCallback(
    async (requestFn, retryCount = 0) => {
      try {
        const response = await requestFn();
        return response.data;
      } catch (error) {
        // Only retry once for 401/402 errors
        if (
          (error.response?.status === 401 || error.response?.status === 402) &&
          retryCount === 0
        ) {
          console.log("Token expired, attempting refresh...");

          try {
            await refresh();
            // Retry the original request with new token
            return await makeRequest(requestFn, retryCount + 1);
          } catch (refreshError) {
            console.error("Token refresh failed, redirecting to login");
            // Redirect to login or handle authentication failure
            window.location.href = "/auth?mode=signin";
            throw refreshError;
          }
        }

        throw error;
      }
    },
    [refresh]
  );

  const get = useCallback(
    async (url, config = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await makeRequest(() => axios.get(url, config));
        console.log("GET request successful:", result);
        return result;
      } catch (error) {
        console.error("GET request failed:", error);
        setError(error.message || "Request failed");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [makeRequest]
  );

  const post = useCallback(
    async (url, data, config = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await makeRequest(() => axios.post(url, data, config));
        console.log("POST request successful:", result);
        return result;
      } catch (error) {
        console.error("POST request failed:", error);
        setError(error.message || "Request failed");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [makeRequest]
  );

  const put = useCallback(
    async (url, data, config = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await makeRequest(() => axios.put(url, data, config));
        console.log("PUT request successful:", result);
        return result;
      } catch (error) {
        console.error("PUT request failed:", error);
        setError(error.message || "Request failed");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [makeRequest]
  );

  const del = useCallback(
    async (url, config = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await makeRequest(() => axios.delete(url, config));
        console.log("DELETE request successful:", result);
        return result;
      } catch (error) {
        console.error("DELETE request failed:", error);
        setError(error.message || "Request failed");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [makeRequest]
  );

  return { get, post, put, del, isLoading, error, setError, setIsLoading };
};
