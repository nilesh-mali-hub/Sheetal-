import React from 'react';
import { Calendar, MapPin, Navigation } from 'lucide-react';

export default function Events() {
  const events = [
    {
      title: "Haldi",
      date: "03 Dec 2026",
      time: "10:00 AM",
      venue: "The Royal Gardens",
      dressCode: "Yellow / White",
      icon: "🌼"
    },
    {
      title: "Mehendi",
      date: "03 Dec 2026",
      time: "04:00 PM",
      venue: "Poolside Pavilion",
      dressCode: "Green / Floral",
      icon: "🌿"
    },
    {
      title: "Sangeet",
      date: "04 Dec 2026",
      time: "07:00 PM",
      venue: "Grand Ballroom",
      dressCode: "Glamorous Traditional",
      icon: "🎵"
    },
    {
      title: "The Wedding",
      date: "05 Dec 2026",
      time: "06:00 PM",
      venue: "The Heritage Courtyard",
      dressCode: "Royal Indian",
      icon: "💍"
    }
  ];

  return (
    <section id="events" className="pt-[70px] px-6 pb-[100px] max-w-[940px] mx-auto text-center relative">
      <p className="font-cinzel text-[0.7rem] tracking-[0.32em] uppercase text-marigold m-0 mb-[10px]">Event Details</p>
      <h2 className="text-[clamp(2.1rem,5vw,3rem)] text-ivory m-0 font-sans">Join Us in Celebration</h2>
      
      <div className="mt-[56px] flex flex-col gap-[20px] max-w-[500px] mx-auto text-left">
        {events.map((event, idx) => (
          <div key={idx} className="glass-card p-[34px_26px_28px]">
            <div className="w-[36px] h-[36px] mb-4 flex items-center justify-center text-marigold-light text-2xl border border-gold/30 rounded-full">
              {event.icon}
            </div>
            
            <h3 className="m-0 mb-[10px] text-[1.5rem] text-marigold-light font-medium font-sans">{event.title}</h3>
            
            <p className="m-0 text-gold-light text-[1rem] leading-[1.65] opacity-90">
              {event.date} — {event.time} <br />
              {event.venue}
            </p>
            
            <span className="block mt-3 text-[0.7rem] tracking-[0.04em] text-ivory/40 italic font-sans">
              Dress Code: {event.dressCode}
            </span>
            
            <a href="https://www.google.com/maps/search/?api=1&query=24.533521,72.834698" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 font-cinzel text-[0.68rem] tracking-[0.14em] uppercase text-marigold-light border-b border-marigold pb-[2px]">
              Get Directions
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
