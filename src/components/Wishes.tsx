import React, { useState, useEffect } from 'react';
import { Loader2, Heart } from 'lucide-react';

type Wish = { id: number; name: string; message: string; createdAt: string };

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        fetchWishes();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="wishes" className="pt-[70px] px-6 pb-[100px] max-w-[940px] mx-auto text-center relative z-10">
      <p className="font-cinzel text-[0.85rem] sm:text-[1rem] tracking-[0.32em] uppercase text-marigold m-0 mb-[10px]">Blessings</p>
      <h2 className="text-[clamp(2.8rem,8vw,3.5rem)] text-ivory m-0 font-sans mb-12">Wishes Wall</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-left">
        {/* Write a wish form */}
        <div className="glass-card p-5 sm:p-8">
          <h4 className="text-[1.8rem] sm:text-[2rem] font-sans text-marigold-light mb-6 m-0">Leave a Message</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input required type="text" name="name" placeholder="Your Name" className="w-full bg-maroon-deep/50 border border-gold/30 p-4 sm:p-3 text-ivory focus:border-marigold outline-none transition-colors rounded-none text-base sm:text-sm font-sans" />
            </div>
            <div>
              <textarea required name="message" placeholder="Your Blessings & Wishes..." rows={4} className="w-full bg-maroon-deep/50 border border-gold/30 p-4 sm:p-3 text-ivory focus:border-marigold outline-none transition-colors rounded-none text-base sm:text-sm font-sans" />
            </div>
            {status === 'success' && <p className="text-marigold-light text-sm m-0">Message posted successfully!</p>}
            {status === 'error' && <p className="text-red-400 text-sm m-0">Failed to post message.</p>}
            <button 
              disabled={status === 'loading'}
              type="submit" 
              className="w-full bg-marigold hover:bg-marigold-light text-maroon-deep font-cinzel tracking-widest uppercase text-[0.95rem] py-4 transition-colors disabled:opacity-50 flex justify-center items-center border-none cursor-pointer"
            >
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Wish'}
            </button>
          </form>
        </div>

        {/* Wishes Display */}
        <div className="relative h-[450px] overflow-hidden">
          <div className="absolute inset-0 overflow-y-auto pr-4 space-y-4 scrollbar-hide">
            {wishes.length === 0 ? (
              <div className="text-center text-ivory/40 font-sans mt-20 italic">
                Be the first to leave a wish!
              </div>
            ) : (
              wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-gradient-to-b from-[rgba(226,134,28,0.04)] to-transparent border border-gold/20 p-6 rounded-[2px]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0 text-marigold">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-sans font-semibold text-ivory text-xl m-0">{wish.name}</h5>
                      <p className="text-[0.85rem] text-gold-light opacity-60 font-sans mb-3 mt-1 uppercase tracking-widest">
                        {new Date(wish.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="font-sans text-base sm:text-sm text-ivory/80 leading-relaxed m-0 italic">
                        "{wish.message}"
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
