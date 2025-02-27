'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the default icon issue in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

function MapComponent() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Fix the Leaflet icon issue
    const DefaultIcon = L.icon({
      iconUrl: icon.src,
      iconRetinaUrl: iconRetina.src,
      shadowUrl: iconShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
    
    // Create map instance
    const map = L.map('map').setView([15.2993, 74.1240], 10);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Create custom icons
    const createCustomIcon = (color, size = 10) => {
      return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2]
      });
    };
    
    // Define locations - similar to your Google Maps implementation
    const locations = [
      {
        position: [15.2993, 74.1240],
        title: 'Headquarters',
        iconColor: '#4CAF50',
        iconSize: 20,
        content: '<div class="info-window"><h3>Headquarters</h3><p>Main coordination center</p></div>'
      },
      {
        position: [15.3960, 73.8182],
        title: 'North Processing Center',
        iconColor: '#2196F3',
        iconSize: 16,
        content: '<div class="info-window"><h3>North Processing Center</h3><p>Handling northern region</p></div>'
      },
      {
        position: [15.2058, 74.0087],
        title: 'South Collection Hub',
        iconColor: '#2196F3',
        iconSize: 16,
        content: '<div class="info-window"><h3>South Collection Hub</h3><p>Serving southern communities</p></div>'
      },
      {
        position: [15.1845, 73.9504],
        title: 'Recycling Facility',
        iconColor: '#FF9800',
        iconSize: 14,
        content: '<div class="info-window"><h3>Recycling Facility</h3><p>Advanced recycling technology</p></div>'
      }
    ];
    
    // Add markers
    locations.forEach(location => {
      const icon = createCustomIcon(location.iconColor, location.iconSize);
      
      L.marker(location.position, { icon: icon })
        .addTo(map)
        .bindPopup(location.content)
        .bindTooltip(location.title);
    });
    
    // Add service area outline
    const areaCoordinates = [
      [15.7649, 73.7652],
      [15.7649, 74.3509],
      [14.8967, 74.3509],
      [14.8967, 73.6764],
      [15.7649, 73.7652]
    ];
    
    L.polygon(areaCoordinates, {
      color: '#1B5E20',
      weight: 2,
      fillColor: '#4CAF50',
      fillOpacity: 0.1
    }).addTo(map);
    
    // Add zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    // Add scale control
    L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);
    
    setIsMapLoaded(true);
    
    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);
  
  return <div id="map" style={{ height: '500px', width: '100%', borderRadius: '0.5rem' }}></div>;
}

export default MapComponent;