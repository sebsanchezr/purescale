import Image from 'next/image'

// drop image files in public/creatives/ and list them here e.g. { src: '/creatives/example1.jpg', label: 'Brand Name' }
const EXAMPLES: { src: string; label: string }[] = []

export function CreativeExamples() {
  if (EXAMPLES.length === 0) return null

  return (
    <section className="py-20 px-4 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">
            Work that <span className="font-poppins-italic text-cyan-300">runs</span>, not decks
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {EXAMPLES.map((example, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all duration-200"
            >
              <Image
                src={example.src}
                alt={example.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                <p className="text-white text-xs font-semibold">{example.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
