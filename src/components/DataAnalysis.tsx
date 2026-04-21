import React, { useRef, useState } from 'react';
import { Camera, Bell, Swords, BarChart3, TrendingUp, TrendingDown, ClipboardCheck, AlertCircle, AlertTriangle, Lightbulb, Users, MessageSquare, Share2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { APP_AVATAR, APP_NAME } from '../constants/app';

export default function DataAnalysis() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasReport, setHasReport] = useState(false);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      // Simulate account diagnosis processing
      setTimeout(() => {
        setIsUploading(false);
        setHasReport(true);
      }, 2500);
    }
  };

  const diagnosisResults = [
    { 
      id: 1, 
      icon: '🚨', 
      title: '发布频率', 
      tag: '紧急', 
      tagColor: 'bg-rose-50 text-rose-500', 
      desc: '近7天仅发布1条内容，活跃度低于行业同规模小店45%。建议保持每周至少3更。' 
    },
    { 
      id: 2, 
      icon: '⚠️', 
      title: '互动转化', 
      tag: '警告', 
      tagColor: 'bg-amber-50 text-amber-500', 
      desc: '评论区回复率为20%，导致粉丝流失风险增加。高活账号平均回复率应在70%以上。' 
    },
    { 
      id: 3, 
      icon: '💡', 
      title: '标签优化', 
      tag: '洞察', 
      tagColor: 'bg-sky-50 text-sky-500', 
      desc: '使用 #社区美食 #小店日常 等长尾标签，触达精准率可提升12%。' 
    },
  ];

  return (
    <div className="pb-24 w-full">
      <header className="flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50 bg-emerald-50/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container border-2 border-white shadow-sm flex items-center justify-center">
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
        <div>
          <h1 className="text-[1.75rem] font-bold text-on-surface leading-tight">运营诊断</h1>
          <p className="text-on-surface-variant text-sm mt-1 opacity-70">深度发现账号增长痛点与优化空间</p>
        </div>

        <section className="grid grid-cols-1 gap-4">
          {/* Upload Area */}
          <div className="bg-white/40 rounded-3xl p-8 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-center space-y-4 shadow-sm relative overflow-hidden">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={onFileChange} 
              className="hidden" 
              accept="image/*"
            />
            
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center gap-3 transition-opacity">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-sm font-bold text-primary">AI 正在深度诊断账号...</p>
              </div>
            )}

            <div className="w-16 h-16 bg-primary-container rounded-3xl flex items-center justify-center text-3xl shadow-inner">
              📸
            </div>
            <div>
              <h3 className="font-bold text-on-surface">上传账号后台截图</h3>
              <p className="text-[11px] text-on-surface-variant px-4 mt-1">上传您的抖音/小红书后台数据截图，AI为您即时诊断。</p>
            </div>
            <button 
              onClick={handleUpload}
              className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              上传数据截图
            </button>
          </div>

          {/* Competitor Input */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-surface-container space-y-4">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-tertiary" />
              <h3 className="font-bold text-on-surface">竞品小店对比</h3>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-tertiary">竞品账号名称</label>
              <input 
                type="text" 
                placeholder="例如：隔壁王大妈私房菜" 
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary placeholder:text-outline-variant outline-none"
              />
            </div>
            <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]">
              开始对比分析
            </button>
          </div>
        </section>

        {/* Sample Report Preview */}
        <section className={`space-y-4 transition-all duration-500 ${hasReport ? 'opacity-100 translate-y-0' : 'opacity-40 blur-[2px]'}`}>
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-on-surface">诊断报告预览</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">实时更新</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-primary-container rounded-3xl p-8 flex items-center justify-between shadow-sm"
          >
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container opacity-60">账号运营健康评分</p>
              <h2 className="text-6xl font-black text-on-primary-container leading-none py-2 tracking-tighter">72<span className="text-xl opacity-40 font-bold">/100</span></h2>
              <p className="text-sm font-bold text-on-primary-container mt-1">需加强粉丝互动 📉</p>
            </div>
            <div className="text-7xl opacity-10 absolute -right-4 -bottom-2 select-none rotate-12">📱</div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl shadow-sm border-t-4 border-emerald-500">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-emerald-500" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-outline">高涨粉视频</h4>
              </div>
              <p className="text-sm font-bold text-on-surface truncate">探店：王牌牛腩面</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-primary font-bold">转化率 +18.5%</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border-t-4 border-tertiary">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="w-4 h-4 text-tertiary" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-outline">分享峰值</h4>
              </div>
              <p className="text-sm font-bold text-on-surface truncate">每周五 19:00</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-secondary" />
                <span className="text-[10px] text-secondary font-bold">高出均值 42%</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Findings List */}
          <div className="bg-surface-container/30 rounded-3xl p-6 space-y-4 border border-surface-container">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-primary" />
              运营分析结果
            </h3>
            <div className="space-y-4">
              {diagnosisResults.map((res) => (
                <motion.div 
                  key={res.id}
                  whileHover={{ x: 4 }}
                  className="bg-white p-4 rounded-2xl flex items-start gap-4 shadow-sm border border-surface-container"
                >
                  <span className="text-2xl leading-none">{res.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-on-surface truncate">{res.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${res.tagColor}`}>{res.tag}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-1.5 leading-relaxed font-medium">
                      {res.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
