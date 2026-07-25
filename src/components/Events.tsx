import React from 'react';
import { CalendarPlus, Share2 } from 'lucide-react';

export default function Events() {
  const events = [
    {
      title: "Haldi",
      date: "03 Dec 2026",
      time: "10:00 AM",
      emoji: "🌼"
    },
    {
      title: "Mehendi",
      date: "03 Dec 2026",
      time: "04:00 PM",
      emoji: "🌿"
    },
    {
      title: "Sangeet",
      date: "03 Dec 2026",
      time: "07:00 PM",
      emoji: "🎵"
    },
    {
      title: "Bindoli",
      date: "04 Dec 2026",
      time: "09:00 PM",
      emoji: "🥁"
    },
    {
      title: "The Wedding",
      date: "05 Dec 2026",
      time: "06:00 PM",
      emoji: "💍"
    }
  ];

  const handleAddToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sheetal and Prakash Wedding//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Sheetal & Prakash Ji's Wedding Celebrations
DTSTART;TZID=Asia/Kolkata:20261203T100000
DTEND;TZID=Asia/Kolkata:20261206T000000
DESCRIPTION:Join us in celebrating the wedding of Sheetal & Prakash Ji! Events include Haldi, Mehendi, Sangeet, Bindoli, and The Wedding.
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Sheetal & Prakash Ji's Wedding Celebrations start tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sheetal_prakash_wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = () => {
    const message = `You are invited to the wedding of Sheetal & Prakash Ji! ✨\n\nSave the date: 5th December 2026\n\nView the invitation details here:\nhttps://sheetal-prakashji.vercel.app/`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="events" className="pt-[70px] px-6 pb-[100px] max-w-[940px] mx-auto text-center relative">
      <p className="font-cinzel text-[0.7rem] tracking-[0.32em] uppercase text-marigold m-0 mb-[10px]">Event Details</p>
      <h2 className="text-[clamp(2.1rem,5vw,3rem)] text-ivory m-0 font-sans">Join Us in Celebration</h2>
      
      <div className="mt-[56px] flex flex-col gap-[20px] max-w-[500px] mx-auto text-left">
        {events.map((event, idx) => (
          <div key={idx} className="glass-card p-[24px_26px] flex items-center gap-6 relative overflow-hidden group hover:border-gold/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center shrink-0 border border-gold/40 shadow-[0_0_15px_rgba(201,162,75,0.15)] bg-gold/5 text-3xl group-hover:scale-110 transition-transform duration-500">
              {event.emoji}
            </div>
            <div className="flex-1">
              <h3 className="m-0 mb-[8px] text-[1.5rem] text-marigold-light font-medium font-sans flex items-center gap-2">
                {event.title}
              </h3>
              <p className="m-0 text-gold-light text-[1.05rem] leading-[1.5] opacity-90">
                {event.date} <span className="opacity-50 mx-1">|</span> <span className="italic">{event.time}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button 
          onClick={handleAddToCalendar}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gold/10 hover:bg-gold/20 border border-gold/50 rounded-full text-gold-light transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <CalendarPlus size={20} />
          <span className="font-sans font-medium tracking-wide">Add to Calendar</span>
        </button>

        <button 
          onClick={handleShareWhatsApp}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/50 rounded-full text-[#25D366] transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <Share2 size={20} />
          <span className="font-sans font-medium tracking-wide">Share on WhatsApp</span>
        </button>
      </div>
    </section>
  );
}
