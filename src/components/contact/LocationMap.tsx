
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = process.env.VITE_MAPBOX_TOKEN || '';
    
    // Coordinates for Mota Gur St 4, Petah Tikva, Israel
    const coordinates = [34.887728, 32.094595];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 15
    });

    // Add marker
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <div ref={mapContainer} className="h-[400px] w-full" />
    </Card>
  );
};

export default LocationMap;
