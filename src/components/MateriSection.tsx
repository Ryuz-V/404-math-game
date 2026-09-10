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
    <div className="w-full bg-white min-h-screen font-sans flex flex-col items-center justify-start px-8 md:px-16 pt-12 pb-24">
      <div className="w-full max-w-[900px] flex-1">
        
        {/* Main Title */}
        <h1 className="text-[28px] font-semibold text-[#1d2125] mb-8">
          Resources
        </h1>

        {/* Tabs - Exact match to LMS */}
        <div className="flex flex-wrap border-b border-[#dee2e6] gap-x-6">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] transition-colors relative
                ${activeTab === tab ? 'text-[#1d2125] font-semibold' : 'text-[#495057] hover:text-[#1d2125]'}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#c00000]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Filters and Layout Toggle Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-6 gap-4">
          
          {/* Sort Dropdown */}
          <div className="relative">
            <select className="appearance-none border border-[#ced4da] rounded-md py-2 pl-3 pr-8 text-[14px] text-[#495057] bg-white focus:outline-none focus:border-[#80bdff] focus:ring-1 focus:ring-[#80bdff] shadow-sm cursor-pointer">
              <option>Sort by course name</option>
              <option>Sort by last accessed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6c757d]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#adb5bd]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search" 
              className="border border-[#ced4da] rounded-md py-2 pl-9 pr-3 text-[14px] bg-white focus:outline-none focus:border-[#80bdff] focus:ring-1 focus:ring-[#80bdff] shadow-sm w-[250px] text-[#495057] placeholder-[#adb5bd]"
            />
          </div>

          {/* Layout View Icons */}
          <div className="flex items-center gap-2 sm:ml-auto text-[#6c757d]">
            {/* Grid icon (active) */}
            <button className="text-[#1d2125]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            {/* List icon */}
            <button className="text-[#adb5bd] hover:text-[#6c757d] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {/* Summary icon */}
            <button className="text-[#adb5bd] hover:text-[#6c757d] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </button>
          </div>
          
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative mb-6">
            <div className="w-[100px] h-[110px] bg-[#e9ecef] rounded-lg flex items-center justify-center p-3 shadow-inner">
               <div className="grid grid-cols-2 gap-2 w-full h-full">
                 <div className="bg-white rounded-md p-1.5 flex flex-col gap-1.5 justify-center shadow-sm">
                    <div className="h-1 w-full bg-[#dee2e6] rounded-sm"></div>
                    <div className="h-1 w-2/3 bg-[#dee2e6] rounded-sm"></div>
                 </div>
                 <div className="bg-white rounded-md p-1.5 flex flex-col gap-1.5 justify-center shadow-sm">
                    <div className="h-1 w-full bg-[#dee2e6] rounded-sm"></div>
                    <div className="h-1 w-2/3 bg-[#dee2e6] rounded-sm"></div>
                 </div>
                 <div className="bg-white rounded-md p-1.5 flex flex-col gap-1.5 justify-center shadow-sm">
                    <div className="h-1 w-full bg-[#dee2e6] rounded-sm"></div>
                    <div className="h-1 w-2/3 bg-[#dee2e6] rounded-sm"></div>
                 </div>
                 <div className="bg-white rounded-md p-1.5 flex flex-col gap-1.5 justify-center shadow-sm">
                    <div className="h-1 w-full bg-[#dee2e6] rounded-sm"></div>
                    <div className="h-1 w-2/3 bg-[#dee2e6] rounded-sm"></div>
                 </div>
               </div>
            </div>
            {/* Soft shadow underneath */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[80px] h-3 bg-black/5 rounded-[50%] blur-sm"></div>
          </div>
          <p className="text-[#6c757d] text-[16px]">No courses</p>
        </div>
      </div>
    </div>
  );
}
