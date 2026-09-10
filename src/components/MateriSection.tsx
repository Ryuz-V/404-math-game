"use client";

import { useState } from 'react';

interface MateriSectionProps {
  onStartSoloWithTopic?: (topicId: string) => void;
  onStartVersus?: () => void;
}

export default function MateriSection({ onStartSoloWithTopic, onStartVersus }: MateriSectionProps) {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'In progress', 'Future', 'Past', 'Starred', 'Removed from view'];

  return (
    <div className="w-full min-h-screen font-sans flex flex-col items-center justify-start px-4 md:px-8 pt-8 pb-24 !mt-6">
      <div className="w-full max-w-[1350px] flex-1">
        
        {/* Main Titles */}
        <div className="flex flex-col !gap-5 pt-4 pb-8">
          <h1 className="text-[24px] font-semibold text-[#212529]">
            Resources
          </h1>
          <h2 className="text-[18px] font-semibold text-[#212529]">
            Course overview
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-[#dee2e6] gap-x-6 !mt-4">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`!pb-4 text-[14px] transition-colors relative
                ${activeTab === tab ? 'text-[#212529] font-medium' : 'text-[#6c757d] hover:text-[#212529]'}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#c00000]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Filters and Layout Toggle Row */}
        <div className="flex flex-wrap items-center !mt-3 gap-3">

          {/* Layout View Icons */}
          <div className="flex items-center gap-3 ml-2 text-[#6c757d]">
            {/* Grid icon (active, slightly reddish/dark as in reference) */}
            <button className="text-[#a54a4a] hover:text-[#8a3d3d] transition-colors">
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            {/* List icon */}
            <button className="text-[#adb5bd] hover:text-[#6c757d] transition-colors">
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {/* Summary icon */}
            <button className="text-[#adb5bd] hover:text-[#6c757d] transition-colors">
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </button>
          </div>
        </div>
        

      </div>
    </div>
  );
}