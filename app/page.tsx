import { supabase } from '../lib/supabase';
import { BookOpen, Code, Layers, Database, LayoutDashboard, Zap, Award } from 'lucide-react';
import { MotionContainer, MotionItem } from './component/Animate';
import React from 'react';

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

const iconMap: Record<string, any> = {
  Code: Code,
  BookOpen: BookOpen,
  Layers: Layers,
  Database: Database,
};

export default async function DashboardPage() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Supabase error:', error);
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased overflow-x-hidden">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <nav className="hidden md:flex flex-col w-64 border-r border-neutral-900 bg-neutral-950/80 p-6 justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white shadow-lg">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              NextGen Learn
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold px-2 block mb-2">Main Menu</span>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-900 text-purple-400 text-sm font-medium">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
          </div>
        </div>
        <div className="border-t border-neutral-900 pt-4 text-xs text-neutral-600 px-2">
          v1.0.0 Stable
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        <MotionContainer>
          
          {/* Welcome Section */}
          <MotionItem>
            <div className="relative z-10">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2.5 py-1 rounded-full">AI PLATFORM</span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 text-neutral-50">Welcome back, Garv!</h1>
              <p className="text-neutral-400 text-sm mt-1 max-w-md">Your server-rendered education pipeline is running butter-smooth.</p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl w-fit mt-4">
              <span>🔥</span> 5 Day Learning Streak
            </div>
          </MotionItem>

          {/* Grid Layout for Graph (Left) and Courses (Right) */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            
            {/* LEFT: Activity Graph */}
            <div className="flex-[2]">
              <MotionItem>
                <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-900 h-96">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">ACTIVITY GRAPH</h3>
                      <Award className="w-4 h-4 text-neutral-500" />
                   </div>
                   <div className="flex items-end gap-1.5 h-48 pt-4 px-1">
                      {[40, 70, 55, 90, 35, 80, 95, 60, 45, 85, 100].map((val, idx) => (
                        <div key={idx} className="flex-1 bg-neutral-800 rounded-t-sm relative group/bar" style={{ height: `${val}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                   </div>
                </div>
              </MotionItem>
            </div>

            {/* RIGHT: Course Tiles */}
            <div className="w-full lg:w-80 space-y-4">
              {courses && courses.map((course: Course) => {
                const IconComponent = iconMap[course.icon_name] || Code;
                return (
                  <MotionItem key={course.id}>
                    <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800 hover:border-purple-500/30 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-neutral-800 rounded-lg text-purple-400">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-medium text-neutral-200">{course.title}</h3>
                      </div>
                      <p className="text-[10px] text-neutral-500 mb-2">Module Completion</p>
                      <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </MotionItem>
                );
              })}
            </div>
          </div>

        </MotionContainer>
      </main>
    </div>
  );
}