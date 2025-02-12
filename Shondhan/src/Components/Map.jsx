import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const Map = () => {
  useEffect(() => {
    // Crime data for Bangladesh divisions
    const crimeData = [
      { division: "Dhaka", lat: 23.8103, lng: 90.4125, count: 100 }, // Dhaka
      { division: "Chittagong", lat: 22.3569, lng: 91.7832, count: 80 }, // Chittagong
      { division: "Rajshahi", lat: 24.3636, lng: 88.6241, count: 60 }, // Rajshahi
      { division: "Khulna", lat: 22.8456, lng: 89.5403, count: 50 }, // Khulna
      { division: "Barisal", lat: 22.701, lng: 90.3535, count: 40 }, // Barisal
      { division: "Sylhet", lat: 24.8949, lng: 91.8687, count: 60 }, // Sylhet
      { division: "Rangpur", lat: 25.7439, lng: 89.2752, count: 40 }, // Rangpur
      { division: "Mymensingh", lat: 24.7471, lng: 90.4203, count: 10 }, // Mymensingh
    ];

    // Initialize the map
    const map = L.map('map').setView([23.685, 90.3563], 7); // Center on Bangladesh

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Prepare heatmap data
    const heatmapData = crimeData.map((crime) => [
      crime.lat, // Latitude
      crime.lng, // Longitude
      crime.count, // Intensity (crime count)
    ]);

    // Add heatmap layer
    L.heatLayer(heatmapData, {
      radius: 70, // Adjust the radius for better visualization
      blur: 30, // Adjust the blur for smoother heatmap
      maxZoom: 13,
    }).addTo(map);

    // Add markers for each division (optional)
    crimeData.forEach((crime) => {
      L.marker([crime.lat, crime.lng])
        .bindPopup(`<b>${crime.division}</b><br>Crime Count: ${crime.count}`)
        .addTo(map);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="font-bold text-5xl  mb-4">Crime Heatmap of Bangladesh</h1>
      <p className="text-gray-600 mb-8 text-xl">
        Visualizing crime data across different divisions in Bangladesh.
      </p>
      <div id="map" style={{ height: '700px', width: '100%', maxWidth: '1200px' }}></div>
    </div>
  );
};

export default Map;