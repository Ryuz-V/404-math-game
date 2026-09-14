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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-y-3 !gap-x-1" style={{ rowGap: '12px', columnGap: '4px' }}>
          {filteredData.map((materi) => (
            <div 
              key={materi.id} 
              onClick={() => onStartSoloWithTopic && onStartSoloWithTopic(materi.id)}
              style={{ width: '100%', maxWidth: '375px', border: '1px solid #e5e7eb' }}
              className="!mx-auto border !border-[#e5e7eb] rounded-[16px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all cursor-pointer flex flex-col group overflow-hidden"
            >
              {/* Image Section */}
              <div 
                className="w-full aspect-[4/3] flex items-center justify-center relative transition-transform group-hover:scale-[1.02] bg-white"
              >
                <span className="text-[70px] drop-shadow-xl">{materi.icon}</span>
              </div>

              <div 
                className="p-4 flex flex-col flex-1 !mt-3 !mb-3" 
                style={{ 
                  minHeight: '150px',
                  marginTop: '12px',
                  marginBottom: '12px',
                }}
              >
                {/* Title */}
                <h3 
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1.35,
                    marginTop: '8px',
                    marginBottom: '16px',
                    marginLeft: '10px',
                    marginRight: '6px',
                  }}
                  className="!text-[15px] !font-bold !text-[#111827] !leading-[1.35] !mt-2 !mb-4 !ml-2.5"
                >
                  {materi.title}
                </h3>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onStartSoloWithTopic) onStartSoloWithTopic(materi.id);
                  }}
                  style={{
                    height: '52px',
                    width: 'calc(100% - 24px)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#5bc1b5',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '16px',
                    borderRadius: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(91, 193, 181, 0.35)',
                    transition: 'all 0.2s ease',
                  }}
                  className="!h-[52px] !w-[calc(100%-24px)] !mx-auto !mt-auto !mb-1 !bg-[#5bc1b5] hover:!bg-[#4ea89e] !text-white !font-bold !text-[16px] !rounded-[14px] active:!scale-[0.98]"
                >
                  Study Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}