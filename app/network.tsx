"use client";
import { useState, useEffect } from "react";

interface INetworkQuality {
  isOnline: boolean;
  isConnectionPoor: boolean;
  responseTime: number | null;
}

const networkQuality = (
  url: string,
  threshold: number = 2000
): INetworkQuality => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : false
  );
  const [isConnectionPoor, setIsConnectionPoor] = useState<boolean>(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setIsConnectionPoor(false); // Reset connection quality on offline
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) return;

    const checkConnectionQuality = async () => {
      try {
        const startTime = new Date().getTime();
        await fetch(url, { method: "HEAD" });
        const endTime = new Date().getTime();
        const timeTaken = endTime - startTime;

        setResponseTime(timeTaken);
        setIsConnectionPoor(timeTaken > threshold);
      } catch (error) {
        setResponseTime(null);
        setIsConnectionPoor(true); // asumsi jika koneksi buruk
      }
    };

    const interval = setInterval(checkConnectionQuality, 1000); // check interval 2 seken
    checkConnectionQuality(); // Initial check
    return () => clearInterval(interval);
  }, [isOnline, url, threshold]);

  return { isOnline, isConnectionPoor, responseTime };
};

export default networkQuality;
