// paste YouTube/Loom URL here to go live
const VIDEO_URL = ''

export function ThankYouVSL() {
  if (!VIDEO_URL) return null

  return (
    <section className="py-16 px-4 bg-black border-b border-white/10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Watch this <span className="font-poppins-italic text-cyan-300">before we speak</span>
          </h2>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={VIDEO_URL}
              title="Watch before we speak"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-xl border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
