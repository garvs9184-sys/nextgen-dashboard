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
  const { data: courses } = await supabase.from('courses').select('*');

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <nav className="w-64 border-r border-neutral-900 p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-purple-600 p-2 rounded-lg"><Zap className="w-4 h-4" /></div>
          <span className="font-bold">NextGen Learn</span>
        </div>
        <div className="text-purple-400 font-medium flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Dashboard</div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <MotionContainer>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, Garv!</h1>
            <p className="text-neutral-400 text-sm">Your server-rendered education pipeline is running butter-smooth.</p>
          </div>

          {/* GRID LAYOUT: Graph (Left) + Courses (Right) */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Left side: Graph (Spans 3 columns) */}
            <div className="xl:col-span-3 bg-neutral-900/30 p-6 rounded-3xl border border-neutral-900">
               <h3 className="text-xs text-neutral-500 uppercase mb-6">Activity Graph</h3>
               <div className="h-64 flex items-end gap-2">
                  {[40, 70, 55, 90, 35, 80, 95, 60, 45, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-neutral-800 rounded-t-lg" style={{ height: `${h}%` }} />
                  ))}
               </div>
            </div>

            {/* Right side: Courses (Spans 1 column) */}
            <div className="xl:col-span-1 space-y-4">
              {courses?.map((course: Course) => {
                const Icon = iconMap[course.icon_name] || Code;
                return (
                  <div key={course.id} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{course.title}</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full">
                       <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </MotionContainer>
      </main>
    </div>
  );
}