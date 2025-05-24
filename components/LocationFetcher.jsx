"use client"
import { useEffect, useState } from "react";

export default function LocationFetcher({ onLocation }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          onLocation({ latitude, longitude });
        },
        err => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation not supported.");
    }
  }, []);

  return null;
}
