export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
            Intelligent Lead Scoring <br className="hidden sm:block" />
            <span className="text-indigo-600 dark:text-indigo-400">Powered by AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Transform your pipeline with autonomous qualification. We analyze, score, and prioritize your prospects instantly so your team can focus on closing deals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#lead-form" className="btn-primary text-lg px-8 py-4">
              Qualify Your Leads
            </a>
            <a href="#features" className="inline-flex justify-center items-center px-8 py-4 border border-gray-300 dark:border-slate-700 text-lg font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
