import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import SuccessModal from './components/SuccessModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-500 relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-100/40 dark:bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-purple-100/30 dark:bg-purple-900/20 blur-[120px]"></div>
      </div>

      <Navbar />
      
      <main>
        <Hero />
        
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          
          <LeadForm onSuccess={() => setIsModalOpen(true)} />
        </section>
      </main>

      <footer className="border-t border-gray-100 dark:border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LeadFlow AI. All rights reserved.
          </p>
        </div>
      </footer>

      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
