import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const socket = io(BASE_URL);

const LocationTracker = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const updateLocation = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    socket.emit("locationUpdate", { latitude, longitude });

    fetch(`${BASE_URL}/api/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude }),
    });
  };

  const handleError = (error) => {
    setError("Please enable location services.");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updateLocation, handleError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    socket.on("locationUpdated", (newLocation) => {
      setLocation({
        latitude: newLocation.coordinates[0],
        longitude: newLocation.coordinates[1],
      });
    });

    return () => socket.off("locationUpdated");
  }, []);

  return (
    <div>
      <h1>Current Location</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </>
      )}
    </div>
  );
};

export default LocationTracker;
