import React from 'react';
import { Bell, TrendingUp, Users, Eye, MessageSquare, Sparkles, BarChart3, Calendar, Plus, History } from 'lucide-react';
import { motion } from 'motion/react';
import { APP_AVATAR, APP_NAME } from '../constants/app';

export default function Dashboard() {
  const historyItems = [
    { id: 1, title: '创建了新计划', desc: '谷雨节气推文 - 4月20日', time: '2小时前', icon: '📝', color: 'bg-blue-50 text-blue-500' },
    { id: 2, title: '生成了AI文案', desc: '小红书: 招牌菠萝油', time: '5小时前', icon: '🤖', color: 'bg-emerald-50 text-emerald-500' },
    { id: 3, title: '导出了报告', desc: '深水埗竞品对比报告', time: '昨天', icon: '📊', color: 'bg-purple-50 text-purple-500' },
  ];

  const topics = [
    { id: 1, tag: '节气营销', trend: '#谷雨吃出春意', title: '谷雨至：在冰室叹一口早春冻柠茶', reach: '5.6k 潜在触达', primary: true },
    { id: 2, tag: '探店攻略', trend: '#香港老味道', title: '小众探店：九龙冰室的怀旧电影感', reach: '3.2k 潜在触达', primary: false },
  ];

  return (
    <div className="pb-24 w-full">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50 bg-surface-container-low/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden border-2 border-surface-container-lowest shadow-sm">
            <img 
              alt={APP_NAME} 
              src={APP_AVATAR} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold text-on-surface tracking-tight">{APP_NAME}</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface/80 hover:bg-white/50 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      <main className="px-4 py-6 space-y-8">
        {/* Account Health Overview */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <div>
              <h2 className="text-2xl font-bold leading-tight">健康概览</h2>
            </div>
            <TrendingUp className="w-8 h-8 text-primary opacity-20" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="col-span-2 bg-gradient-to-br from-primary/20 to-primary/40 p-6 rounded-3xl flex justify-between items-center overflow-hidden relative border border-primary/20"
            >
              <div className="z-10">
                <p className="text-sm font-medium text-on-primary-container opacity-80">总互动数</p>
                <h3 className="text-5xl font-black text-on-primary-container leading-none tracking-tighter">12.4k</h3>
                <p className="text-[10px] font-bold text-primary mt-3 bg-white/60 inline-block px-2 py-1 rounded-lg">
                  ↑ 本周增长 12%
                </p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10">
                <TrendingUp className="w-48 h-48" />
              </div>
            </motion.div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container">
              <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">粉丝</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">2,840</span>
                <span className="text-[10px] text-primary font-bold">+42</span>
              </div>
            </div>

            <div className="bg-secondary-container p-5 rounded-3xl shadow-sm border border-secondary/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container mb-1 opacity-70">浏览量</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-on-secondary-container">8.1k</span>
                <span className="text-[10px] text-secondary font-bold">+156</span>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Topic Recommendations */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">今日话题</h2>
              <span className="text-xl">💡</span>
            </div>
            <button className="text-primary text-sm font-bold active:scale-95 transition-transform">刷新</button>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 no-scrollbar">
            {topics.map((topic) => (
              <motion.div 
                key={topic.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`min-w-[280px] p-5 rounded-3xl border border-outline-variant/15 flex flex-col gap-3 ${
                  topic.primary ? 'bg-white' : 'bg-primary-container/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                    topic.primary ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary-container'
                  }`}>
                    {topic.tag}
                  </span>
                  <span className="text-[10px] font-medium text-outline">{topic.trend}</span>
                </div>
                <h4 className="text-lg font-bold leading-snug">{topic.title}</h4>
                <p className="text-sm text-on-surface-variant line-clamp-2">探索下一季可持续餐桌布置的转变趋势...</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200">
                        <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="" className="w-full h-full rounded-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider">{topic.reach}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest History List */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold px-1">最新活动</h2>
          <div className="space-y-3">
            {historyItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 4 }}
                className="bg-white/60 p-4 rounded-2xl flex items-center gap-4 border border-surface-container"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{item.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-outline/60">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
