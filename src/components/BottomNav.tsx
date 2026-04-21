import React from 'react';
import { Home, MessageSquare, PlusCircle, BarChart3, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'topics', icon: MessageSquare, label: '话题' },
    { id: 'create', icon: PlusCircle, label: '创建', isAction: true },
    { id: 'data', icon: BarChart3, label: '数据' },
    { id: 'profile', icon: User, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/80 backdrop-blur-xl rounded-t-4xl shadow-[0_-8px_24px_rgba(0,0,0,0.04)] sm:max-w-md sm:mx-auto sm:left-1/2 sm:-translate-x-1/2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 relative ${
              isActive 
                ? tab.isAction ? 'text-primary' : 'text-primary bg-primary/10 rounded-2xl px-4 py-2 scale-90' 
                : 'text-outline/60 hover:text-primary'
            }`}
          >
            <Icon className={`${tab.isAction ? 'w-8 h-8' : 'w-6 h-6'}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {tab.label}
            </span>
            {isActive && !tab.isAction && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/5 rounded-2xl -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
