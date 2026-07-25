import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom gold pin icon
const goldIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23C9A24B" stroke="%23360A0E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"%3E%3C/path%3E%3Ccircle cx="12" cy="10" r="3" fill="%23FBF1E4"%3E%3C/circle%3E%3C/svg%3E',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [13, 41]
});

export default function Venue() {
  const position: [number, number] = [24.533521, 72.834698];

  return (
    <section id="venue" className="pt-[70px] px-6 pb-[100px] max-w-[940px] mx-auto text-center relative z-10">
      <p className="font-cinzel text-[0.7rem] tracking-[0.32em] uppercase text-marigold m-0 mb-[10px]">Location</p>
      <h2 className="text-[clamp(2.1rem,5vw,3rem)] text-ivory m-0 font-sans">The Venue Map</h2>
      
      <div className="mt-12 relative z-10 w-full h-[400px] md:h-[500px] [perspective:1200px] flex items-center justify-center">
        <div 
          className="w-full max-w-[800px] h-full border border-gold rounded-[2px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-out hover:![transform:rotateX(0deg)_rotateZ(0deg)_scale(1)] [transform:rotateX(55deg)_rotateZ(-25deg)_scale(0.85)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <MapContainer center={position} zoom={16} scrollWheelZoom={false} className="w-full h-full filter sepia-[0.18] saturate-[0.85] hue-rotate-[-6deg] brightness-90 contrast-105" style={{ background: '#FBF1E4' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <Marker position={position} icon={goldIcon}></Marker>
        </MapContainer>
        </div>
      </div>
      <span className="block mt-8 text-[0.7rem] text-ivory/40 italic font-sans">Wedding Venue, Mount Abu Area, Rajasthan</span>
    </section>
  );
}
