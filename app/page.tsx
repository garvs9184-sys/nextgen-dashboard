import { createClient } from '@supabase/supabase-js';
import { BookOpen, Code, Layers, Database, LayoutDashboard, Zap } from 'lucide-react';
import { MotionContainer, MotionItem } from './component/Animate';
import React from 'react';

// SUPABASE CLIENT (Directly yahan initialize kar rahe hain taaki koi config issue na ho)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const iconMap: Record<string, any> = {
  code: Code,
  bookopen: BookOpen,
  layers: Layers,
  database: Database,
};

export default async function DashboardPage() {
  // RLS bypass karne ke liye 'select' ke saath 'error' check karenge
  const { data: courses, error } = await supabase.from('courses').select('*');

  return (
    <div className="flex min-h-screen bg-[#050505] text-neutral-100 font-sans">
      <nav className="w-64 border-r border-neutral-900 bg-neutral-950 p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-purple-600 p-2 rounded-xl text-white"><Zap className="w-5 h-5" /></div>
          <span className="font-bold">NextGen Learn</span>
        </div>
        <div className="text-purple-400 font-medium flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Dashboard</div>
      </nav>

      <main className="flex-1 p-10 overflow-y-auto">
        <MotionContainer>
          <div className="max-w-6xl mx-auto">
            <MotionItem>
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-neutral-50">Welcome back, Garv!</h1>
                <p className="text-neutral-400 text-sm mt-1">Your server-rendered education pipeline is running butter-smooth.</p>
              </div>
            </MotionItem>
          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MotionItem>
                  <div className="bg-neutral-950 p-8 rounded-3xl border border-neutral-900 h-full">
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-6">Activity Graph</h3>
                    <div className="h-48 flex items-end gap-2">
                      {[40, 70, 55, 90, 35, 80, 95, 60, 45, 85, 100].map((val, i) => (
                        <div key={i} className="flex-1 bg-neutral-800 rounded-t-sm" style={{ height: `${val}%` }} />
                      ))}
                    </div>
                  </div>
                </MotionItem>
              </div>

              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-4">My Courses</h3>
                {error ? (
                  <p className="text-red-500 text-sm">Error: {error.message}</p>
                ) : !courses || courses.length === 0 ? (
                  <p className="text-neutral-600 text-sm">No courses found (Check RLS Policies!)</p>
                ) : (
                  courses.map((course: any) => {
                    const Icon = iconMap[course.icon_name?.toLowerCase()] || Code;
                    return (
                      <MotionItem key={course.id}>
                        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 hover:border-purple-500/50 transition-all cursor-pointer">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-neutral-800 rounded-lg">
                              <Icon className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-neutral-200">{course.title}</h4>
                              <p className="text-[10px] text-neutral-500">Module Completion</p>
                            </div>
                          </div>
                          <div className="w-full bg-neutral-800 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>
                      </MotionItem>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </MotionContainer>
      </main>
    </div>
  );
}