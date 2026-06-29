export function VSL() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-white">
          See How It <span className="font-poppins-italic">Works</span>
        </h2>
        
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-400/30 p-2 shadow-2xl shadow-blue-500/20">
          <div className="bg-black rounded-xl aspect-video flex items-center justify-center group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <button className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-2xl">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            <p className="absolute bottom-6 left-6 text-gray-400 text-sm italic">Add your VSL or demo video here</p>
          </div>
        </div>
      </div>
    </section>
  )
}
