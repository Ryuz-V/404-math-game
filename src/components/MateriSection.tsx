"use client";

import { useState } from 'react';
import { MATERI_KELAS_12 } from '../data/mathData';

interface MateriSectionProps {
  onStartSoloWithTopic?: (topicId: string) => void;
  onStartVersus?: () => void;
}

export default function MateriSection({ onStartSoloWithTopic, onStartVersus }: MateriSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Duplicate items slightly if needed to have more cards like in the image (which has 8 cards).
  // The user's image has multiple cards, we only have 4 in mathData. We can duplicate them for visual parity.
  const displayData = [...MATERI_KELAS_12, ...MATERI_KELAS_12.map(m => ({ ...m, id: m.id + '-2' }))];

  const filteredData = displayData.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen font-sans flex flex-col items-center justify-start px-4 md:px-8 pt-8 pb-24 bg-[#fafafa]">
      <div className="w-full max-w-[1200px] flex-1">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center !my-8 gap-4">
          <h2 className="text-[26px] font-bold text-[#111827]">
            Daftar Learning Path Rancangan Experts
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((materi, index) => {
            // Mock stats for visual parity with screenshot
            const usersCount = (80 + index * 15) + "." + (100 + index * 43);
            const topicsCount = materi.keyFormulas.length + 5;
            const materialsCount = topicsCount * 12 + index * 7;
            const rating = (4.5 + (index % 5) * 0.1).toFixed(2).replace('.', ',');

            return (
              <div 
                key={materi.id} 
                onClick={() => onStartSoloWithTopic && onStartSoloWithTopic(materi.id)}
                className="border border-gray-100/80 rounded-[16px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all cursor-pointer flex flex-col group overflow-hidden"
              >
                {/* Image Section */}
                <div 
                  className="w-full aspect-[4/3] flex items-center justify-center relative transition-transform group-hover:scale-[1.02] bg-white"
                >
                  <span className="text-[70px] drop-shadow-xl">{materi.icon}</span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="font-bold text-[17px] text-[#111827] mb-4 leading-[1.3]">
                    {materi.title}
                  </h3>
  
                  {/* Meta Information */}
                  <div className="text-[13px] text-[#6b7280] flex flex-col gap-2.5 mt-auto">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#5bc1b5]" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                      <span>{usersCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#5bc1b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      <span>{topicsCount} Topik • {materialsCount} Materi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#5bc1b5]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span>{rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}