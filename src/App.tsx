import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import TopicLibrary from './components/TopicLibrary';
import CopyGenerator from './components/CopyGenerator';
import DataAnalysis from './components/DataAnalysis';
import Profile from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [preselectedTopic, setPreselectedTopic] = useState('');

  const handleSelectTopic = (topicTitle: string) => {
    setPreselectedTopic(topicTitle);
    setActiveTab('create');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard key="home" />;
      case 'topics':
        return <TopicLibrary key="topics" onSelectTopic={handleSelectTopic} />;
      case 'create':
        return <CopyGenerator key="create" initialTopic={preselectedTopic} clearInitialTopic={() => setPreselectedTopic('')} />;
      case 'data':
        return <DataAnalysis key="data" />;
      case 'profile':
        return <Profile key="profile" />;
      default:
        return <Dashboard key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low font-sans selection:bg-primary/20 max-w-md mx-auto relative shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full flex flex-col"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
