import React from 'react';
import { Bell, MapPin, ChevronRight, Store, Calendar, Bookmark, History, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { APP_AVATAR, APP_NAME } from '../constants/app';

export default function Profile() {
  const menuGroups = [
    {
      title: '管理中心',
      items: [
        { label: '我的门店信息', icon: Store, emoji: '🏪' },
        { label: '内容计划', icon: Calendar, emoji: '📅' },
        { label: '收藏话题', icon: Bookmark, emoji: '🔖' },
        { label: '生成历史', icon: History, emoji: '📜', badge: '新' },
      ]
    },
    {
      items: [
        { label: '设置', icon: Settings, emoji: '⚙️' },
      ]
    }
  ];

  return (
    <div className="pb-32 w-full">
      <header className="flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50 bg-emerald-50/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
            <img 
              alt={APP_NAME} 
              src={APP_AVATAR} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold text-emerald-900 tracking-tight">{APP_NAME}</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-emerald-700 hover:bg-emerald-100/50 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      <main className="px-4 py-8 space-y-8">
        {/* Profile Hero Section */}
        <section>
          <div className="relative bg-white/60 rounded-4xl p-8 overflow-hidden shadow-sm border border-white/80">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div 
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 3, scale: 1 }}
                className="w-28 h-28 rounded-4xl bg-white shadow-xl p-1.5 mb-6 transform"
              >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-inner">
                  <img 
                    alt="Bakery Branding" 
                    src={APP_AVATAR} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <h1 className="text-2xl font-bold text-on-surface tracking-tight">{APP_NAME}</h1>
              <div className="flex items-center gap-2 mt-2 text-on-surface-variant bg-surface-container/30 px-4 py-1.5 rounded-full border border-white/50">
                <MapPin className="w-3.5 h-3.5 text-primary" fill="currentColor" fillOpacity={0.2} />
                <span className="text-[10px] font-bold uppercase tracking-wider">中国 香港 铜锣湾</span>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Groups */}
        <div className="space-y-6">
          {menuGroups.map((group, idx) => (
            <section key={idx} className="space-y-3">
              {group.title && (
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline px-3">
                  {group.title}
                </h2>
              )}
              <div className="bg-white/40 rounded-4xl p-2.5 space-y-1 shadow-sm border border-white/60">
                {group.items.map((item, iIdx) => (
                  <motion.button 
                    key={iIdx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-3xl hover:bg-primary-container/20 transition-all group border border-transparent hover:border-primary/10"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl leading-none">{item.emoji}</span>
                      <span className="text-sm font-bold text-on-surface">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="bg-secondary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-outline/40 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Logout Action */}
        <section className="pt-2">
          <motion.button 
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-5 px-6 bg-rose-500/10 text-rose-500 font-bold text-sm rounded-3xl hover:bg-rose-500/15 transition-all flex items-center justify-center gap-3 border border-rose-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </motion.button>
        </section>
      </main>
    </div>
  );
}
