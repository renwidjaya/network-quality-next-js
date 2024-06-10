"use client";

import "./network.css";
import React from "react";
import networkQuality from "./network";

const NetworkStatus: React.FC = () => {
  const { isOnline, isConnectionPoor, responseTime } = networkQuality(
    "https://ebudgeting.ut.ac.id/ping",
    2000
  );

  const getSignalBars = () => {
    if (!isOnline) return 0;
    if (isConnectionPoor) return 2;
    return 4;
  };

  const signalBars = getSignalBars();
  const barColor = !isOnline ? "red" : isConnectionPoor ? "yellow" : "green";

  return (
    <div>
      <h1>{isOnline ? "Online" : "Offline"}</h1>
      <div className="signal-bars">
        <div
          className={`bar ${signalBars >= 1 ? "active" : ""}`}
          style={{ backgroundColor: signalBars >= 1 ? barColor : "lightgray" }}
        ></div>
        <div
          className={`bar ${signalBars >= 2 ? "active" : ""}`}
          style={{ backgroundColor: signalBars >= 2 ? barColor : "lightgray" }}
        ></div>
        <div
          className={`bar ${signalBars >= 3 ? "active" : ""}`}
          style={{ backgroundColor: signalBars >= 3 ? barColor : "lightgray" }}
        ></div>
        <div
          className={`bar ${signalBars >= 4 ? "active" : ""}`}
          style={{ backgroundColor: signalBars >= 4 ? barColor : "lightgray" }}
        ></div>
      </div>
      {isOnline && (
        <div>
          <p>
            {isConnectionPoor ? "Poor " : "Good "}
            {responseTime !== null ? `${responseTime} ms` : `0 ms`}
          </p>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
