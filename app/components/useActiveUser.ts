"use client";

import { useEffect } from "react";

export default function useActiveUser() {
  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2);
      localStorage.setItem("sessionId", sessionId);
    }

    const sendPing = () => {
      fetch("/api/track-user", {
        method: "POST",
        body: JSON.stringify({ sessionId }),
      });
    };

    sendPing();
    const interval = setInterval(sendPing, 60000);

    return () => clearInterval(interval);
  }, []);
}