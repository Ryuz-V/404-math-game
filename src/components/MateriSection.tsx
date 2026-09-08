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
    <div className="w-full bg-white min-h-screen font-sans flex flex-col">
      <div className="max-w-[1300px] mx-auto w-full px-4 md:px-8 pt-10 flex-1">
        
        {/* Main Title */}
        <h1 className="text-[28px] font-semibold text-[#1d2125] mb-8">
          My courses
        </h1>

        {/* Subtitle */}
        <h2 className="text-[20px] font-semibold text-[#1d2125] mb-4">
          Course overview
        </h2>

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

      {/* Footer Area */}
      <footer className="w-full bg-white border-t border-[#dee2e6] pt-12 pb-8 mt-auto">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo Column */}
            <div className="flex items-start">
              <div className="flex flex-col">
                <div className="relative mb-2 w-[160px] h-[50px]">
                  {/* SVG Logo Approximation for ceLOE with red book */}
                  <svg width="100%" height="100%" viewBox="0 0 160 50">
                    <path d="M 20 20 Q 40 5 60 20 Q 80 5 100 20" fill="none" stroke="#c00000" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 20 28 Q 40 13 60 28 Q 80 13 100 28" fill="none" stroke="#c00000" strokeWidth="4" strokeLinecap="round" />
                    <text x="5" y="45" fontFamily="Arial" fontSize="36" fontWeight="bold" fill="#8c8c8c" letterSpacing="-1">ce</text>
                    <text x="45" y="45" fontFamily="Arial" fontSize="36" fontWeight="bold" fill="#8c8c8c">LOE</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-[14px] font-bold text-[#1d2125] mb-4">Address</h3>
              <p className="text-[#6c757d] text-[13px] leading-relaxed pr-4">
                Gedung Panehan Lantai 1,<br />
                Jl. Telekomunikasi Terusan Buah Batu,<br />
                Bandung - 40257, Indonesia
              </p>
            </div>

            {/* Related Links */}
            <div>
              <h3 className="text-[14px] font-bold text-[#1d2125] mb-4">Related Links</h3>
              <ul className="text-[#6c757d] text-[13px] space-y-2">
                <li><a href="#" className="hover:text-[#c00000] hover:underline">CeLOE Dashboard</a></li>
                <li><a href="#" className="hover:text-[#c00000] hover:underline">CeLOE CDS</a></li>
                <li><a href="#" className="hover:text-[#c00000] hover:underline">Career, Alumni and Endowments (CAE)</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-[14px] font-bold text-[#1d2125] mb-4">Social Media</h3>
              <div className="flex gap-3 mb-6 text-[#c00000]">
                {/* Social Icons (using simple generic svgs for FB, YT, IG, TW, IN, TK) */}
                <a href="#" className="hover:opacity-80">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.54-4.5-10.02-10-10.02z"/></svg>
                </a>
                <a href="#" className="hover:opacity-80">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15V9l6.5 3-6.5 3z"/></svg>
                </a>
                <a href="#" className="hover:opacity-80">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.31 4.14.6c-.78.3-1.45.72-2.12 1.39-.67.67-1.09 1.34-1.39 2.12-.29.76-.47 1.63-.53 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.24 2.15.53 2.91.3.78.72 1.45 1.39 2.12.67.67 1.34 1.09 2.12 1.39.76.29 1.63.47 2.91.53 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.24 2.91-.53.78-.3 1.45-.72 2.12-1.39.67-.67 1.09-1.34 1.39-2.12.29-.76.47-1.63.53-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.24-2.15-.53-2.91-.3-.78-.72-1.45-1.39-2.12-.67-.67-1.34-1.09-2.12-1.39-.76-.29-1.63-.47-2.91-.53C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm7.85-11.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                </a>
                <a href="#" className="hover:opacity-80">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.95 4.57a10 10 0 01-2.83.78 4.96 4.96 0 002.16-2.72 9.9 9.9 0 01-3.13 1.2 4.93 4.93 0 00-8.39 4.48A14 14 0 011.67 3.15a4.93 4.93 0 001.52 6.57 4.9 4.9 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.94 4.94 0 004.6 3.42A9.87 9.87 0 010 19.54a13.94 13.94 0 007.55 2.21c9.06 0 14-7.5 14-14v-.64a10.08 10.08 0 002.4-2.54z"/></svg>
                </a>
                <a href="#" className="hover:opacity-80">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM3.56 20.45h3.56V9H3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.72v20.56C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.72V1.72C24 .78 23.2 0 22.22 0z"/></svg>
                </a>
              </div>
              
              <div className="flex gap-2">
                <a href="#" className="bg-black text-white px-3 py-1.5 rounded-md flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3.6 20.4l11.8-6.8-3.1-3.1-8.7 9.9zm12.5-7.2l3.4-2c1.3-.7 1.3-1.9 0-2.6l-3.4-2-3.1 3.1 3.1 3.5zm-4.3-4.3l-8.7-9.9v19.8l8.7-9.9zm-9.5-8.2l8.7 9.9 3.1-3.1-11.8-6.8z"/></svg>
                   <div className="flex flex-col items-start">
                     <span className="text-[9px] leading-[1]">GET IT ON</span>
                     <span className="text-[13px] font-semibold leading-[1.2]">Google Play</span>
                   </div>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
}
