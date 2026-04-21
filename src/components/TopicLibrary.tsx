import React, { useState } from 'react';
import { Search, Bell, Plus, Bolt, Star, Box, History, Layout, BarChart, Globe, Wine, UtensilsCrossed, Music, Camera, Sun, Utensils, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_AVATAR, APP_NAME } from '../constants/app';

interface TopicLibraryProps {
  onSelectTopic: (topicTitle: string) => void;
  key?: string;
}

export default function TopicLibrary({ onSelectTopic }: TopicLibraryProps) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: '全部' },
    { label: '探店', icon: '📸' },
    { label: '节气', icon: '🌦️' },
    { label: '特色', icon: '🇭🇰' },
    { label: '旅游', icon: '✈️' },
  ];

  const topics = [
    { 
      id: 1, 
      icon: '📸', 
      bgColor: 'bg-secondary-container', 
      tag: '必吃清单', 
      category: '旅游',
      tagIcon: Plane, 
      tagColor: 'text-primary',
      title: '香港旅游必吃的10家冰室', 
      level: '通用', 
      platform: '小红书' 
    },
    { 
      id: 2, 
      icon: '🌦️', 
      bgColor: 'bg-tertiary-container', 
      tag: '今日谷雨', 
      category: '节气',
      tagIcon: Sun, 
      tagColor: 'text-primary',
      title: '谷雨：推荐3款祛湿冻饮', 
      level: '专家级', 
      platform: '公众号' 
    },
    { 
      id: 3, 
      icon: '🥖', 
      bgColor: 'bg-primary-container', 
      tag: '镇店之宝', 
      category: '特色',
      tagIcon: Utensils, 
      tagColor: 'text-primary',
      title: '九龙冰室菠萝油：灵魂在黄油', 
      level: '中级', 
      platform: '抖音' 
    },
    { 
      id: 4, 
      icon: '🚶', 
      bgColor: 'bg-secondary-container', 
      tag: '深夜食堂', 
      category: '探店',
      tagIcon: Camera, 
      tagColor: 'text-primary',
      title: '深水埗：逃离闹市的小众冰室', 
      level: '入门级', 
      platform: '小红书' 
    },
    { 
      id: 5, 
      icon: '🍳', 
      bgColor: 'bg-surface-container-high', 
      tag: '特色滑蛋', 
      category: '特色',
      tagIcon: Layout, 
      tagColor: 'text-primary',
      title: '如何拍出令人食指大动的滑蛋饭', 
      level: '初级', 
      platform: '小红书' 
    },
    { 
      id: 6, 
      icon: '🍵', 
      bgColor: 'bg-amber-100', 
      tag: '老字号情怀', 
      category: '特色',
      tagIcon: UtensilsCrossed, 
      tagColor: 'text-amber-600',
      title: '丝袜奶茶：香港人的下午茶灵魂', 
      level: '专家级', 
      platform: 'YouTube' 
    },
  ];

  const filteredTopics = topics.filter(t => {
    const matchesCategory = activeCategory === '全部' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 w-full">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50 bg-surface-container-low/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden border-2 border-white shadow-sm font-bold text-primary flex items-center justify-center">
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

      <main className="px-4 py-8 space-y-8">
        <div>
          <h2 className="text-[1.75rem] font-bold leading-tight text-on-surface">话题库</h2>
          <p className="text-sm text-on-surface-variant mt-1 opacity-70">策划您的冰室故事与特色美味</p>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="搜索话题..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-white border-none rounded-2xl text-on-surface placeholder:text-outline-variant shadow-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex-none px-6 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2 ${
                activeCategory === cat.label 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-on-surface-variant hover:bg-white/80'
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Topic List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic) => (
              <motion.div 
                key={topic.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -2 }}
                className="bg-white p-4 rounded-3xl flex items-center gap-4 relative overflow-hidden transition-all hover:shadow-lg hover:shadow-on-surface/5 border border-surface-container"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl ${topic.bgColor} shadow-inner`}>
                  {topic.icon}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <topic.tagIcon className={`w-3.5 h-3.5 ${topic.tagColor}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-outline">{topic.tag}</span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface truncate pr-2">{topic.title}</h3>
                  <div className="flex items-center gap-4 mt-1.5">
                    <div className="flex items-center gap-1">
                      <BarChart className="w-3 h-3 text-outline/60" />
                      <span className="text-[10px] font-medium text-outline">{topic.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-outline/60" />
                      <span className="text-[10px] font-medium text-outline">{topic.platform}</span>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSelectTopic(topic.title)}
                  className="w-10 h-10 flex items-center justify-center bg-primary rounded-full text-white shadow-lg shadow-primary/20 flex-shrink-0"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredTopics.length === 0 && (
            <div className="text-center py-20 text-outline-variant font-bold uppercase tracking-widest text-xs">
              未能找到相关话题
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
