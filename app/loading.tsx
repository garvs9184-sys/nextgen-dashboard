import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#050505] text-neutral-100 p-6 md:p-10">
      {/* Sidebar Skeleton */}
      <div className="hidden md:block w-64 border-r border-neutral-900 bg-neutral-950 p-6 shrink-0" />
      
      {/* Main Content Skeleton */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
          {/* Hero Tile Skeleton */}
          <div className="lg:col-span-2 md:col-span-2 bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-6 space-y-4 animate-pulse" />
          
          {/* Activity Graph Skeleton */}
          <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-6 animate-pulse" />
          
          {/* Course Tiles Skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-neutral-900/40 border border-neutral-800/60 rounded-3xl p-6 animate-pulse" />
          ))}
        </div>
      </main>
    </div>
  );
}