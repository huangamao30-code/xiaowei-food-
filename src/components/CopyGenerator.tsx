import React, { useState, useEffect } from 'react';
import { Sparkles, Bell, Send, Music2, BookOpen, Circle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { PREGENERATED_COPY } from '../constants/pregenerated';
import { APP_AVATAR, APP_NAME } from '../constants/app';

interface CopyGeneratorProps {
  initialTopic?: string;
  clearInitialTopic?: () => void;
  key?: string;
}

export default function CopyGenerator({ initialTopic, clearInitialTopic }: CopyGeneratorProps) {
  const [platform, setPlatform] = useState('dy');
  const [tone, setTone] = useState('natural');
  const [productInfo, setProductInfo] = useState('');
  const [sellingPoints, setSellingPoints] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');

  useEffect(() => {
    if (initialTopic) {
      setSellingPoints(initialTopic);
      if (clearInitialTopic) clearInitialTopic();
    }
  }, [initialTopic, clearInitialTopic]);

  const platforms = [
    { id: 'dy', name: '抖音', icon: '🎵' },
    { id: 'xhs', name: '小红书', icon: '📕' },
    { id: 'pyq', name: '微信朋友圈', icon: '🟢' },
  ];

  const tones = [
    { id: 'natural', name: '亲切自然', icon: '🌱' },
    { id: 'elegant', name: '高端优雅', icon: '💎' },
    { id: 'humor', name: '幽默风趣', icon: '😂' },
    { id: 'emotional', name: '情感共鸣', icon: '❤️' },
  ];

  const handleGenerate = async () => {
    if (!productInfo || !sellingPoints) return;
    
    setIsGenerating(true);
    setGeneratedResult('');

    // Demo Fallback Logic: Check for pre-generated content based on keywords
    const inputText = (productInfo + sellingPoints).toLowerCase();
    const mockMatch = PREGENERATED_COPY.find(item => 
      item.keywords.every(kw => inputText.includes(kw)) && item.platform === (platform === 'xhs' ? 'xhs' : 'dy')
    );

    if (mockMatch) {
      // Simulate network delay for demo feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGeneratedResult(mockMatch.content);
      setIsGenerating(false);
      return;
    }
    
    try {
      // Using gemini-3-flash-preview model for high speed and reasoning
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const currentPlatform = platforms.find(p => p.id === platform)?.name;
      const currentTone = tones.find(t => t.id === tone)?.name;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一个专业的餐饮文案专家。请根据以下信息为${currentPlatform}生成一段吸引人的文案。
        
        产品信息: ${productInfo}
        核心卖点: ${sellingPoints}
        文案语气: ${currentTone}
        
        请直接输出生成的文案内容，不要包含其他解释。如果是小红书，请带上相关的emoji和话题标签。`,
      });
      
      setGeneratedResult(response.text || '生成失败，请重试。');
    } catch (error) {
      console.error(error);
      setGeneratedResult('AI 引擎出了点小状况，请稍后再试。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pb-24 w-full">
      <header className="flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50 bg-emerald-50/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center">
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

      <main className="px-4 py-8 space-y-6">
        <section>
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">AI 智能文案</span>
              <h1 className="text-[1.75rem] font-bold leading-tight text-on-surface">开启灵感魔法 ✨</h1>
            </div>
            <div className="text-4xl translate-y-[-4px]">✍️</div>
          </div>
        </section>

        <section className="bg-white/40 p-5 rounded-3xl border border-white/60 space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block">选择发布平台</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition-all border-2 ${
                  platform === p.id 
                    ? 'bg-white border-primary-container shadow-sm' 
                    : 'bg-white/50 border-transparent text-outline-variant hover:bg-white'
                }`}
              >
                <span className="text-lg">{p.icon}</span>
                <span className={`text-sm font-bold ${platform === p.id ? 'text-on-surface' : 'text-outline/60'}`}>{p.name}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">产品信息</label>
            <input 
              type="text" 
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              placeholder="今天想推荐什么美食？"
              className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary placeholder:text-outline-variant outline-none"
            />
          </div>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">核心卖点</label>
            <textarea 
              rows={3}
              value={sellingPoints}
              onChange={(e) => setSellingPoints(e.target.value)}
              placeholder="写出你今天想营销的话题..."
              className="w-full bg-surface-container-low border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary placeholder:text-outline-variant outline-none resize-none"
            />
          </div>
        </div>

        <section className="bg-secondary-container/20 p-5 rounded-3xl relative overflow-hidden border border-secondary/10">
          <div className="absolute -top-4 -right-4 text-6xl opacity-5 rotate-12">🎨</div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container mb-3 block">文案语气</label>
          <div className="grid grid-cols-2 gap-3">
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                  tone === t.id ? 'border-primary' : 'border-transparent hover:border-primary/30'
                }`}
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="text-[10px] font-bold">{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="pt-2">
          <button 
            disabled={isGenerating || !productInfo || !sellingPoints}
            onClick={handleGenerate}
            className={`w-full py-5 rounded-3xl bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            ) : (
              <Sparkles className="w-6 h-6 fill-white/20" />
            )}
            <span>{isGenerating ? '正在开启灵感...' : '生成文案'}</span>
          </button>
          <p className="text-center text-[10px] text-outline mt-4 uppercase tracking-[0.2em] font-bold opacity-60">由 CateringPro 智能引擎驱动</p>
        </div>

        <AnimatePresence>
          {generatedResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white p-6 rounded-3xl border border-primary/20 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 生成结果
                </span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedResult);
                    // Add some toast notification here if desired
                  }}
                  className="text-primary text-[10px] font-bold hover:underline"
                >
                  复制结果
                </button>
              </div>
              <div className="text-sm text-on-surface whitespace-pre-wrap leading-relaxed">
                {generatedResult}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
