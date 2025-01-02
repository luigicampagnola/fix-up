"use client";

import { GoogleMap } from "@react-google-maps/api";
import { MapProvider } from "./map-provider";

interface CustomGoogleMapProps {
  zoom: number;
  center: {
    lat: number;
    lng: number;
  };
}

export default function CustomGoogleMap({
  zoom,
  center,
}: CustomGoogleMapProps) {
  const defaultMapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
  };

  return (
    <div className="map-container w-full h-44 border border-internationOrange]">
      <MapProvider>
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={center}
          zoom={zoom}
        />
      </MapProvider>
    </div>
  );
}
