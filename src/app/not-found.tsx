import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🌿</div>
        <h1
          className="text-8xl font-bold text-[#2D6A4F] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold text-[#1B3A5C] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Page introuvable
          <span className="block text-lg font-normal text-gray-400 mt-1">Page Not Found</span>
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Cette page n&apos;existe pas.<br />
          <span className="text-sm">This page does not exist.</span>
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold rounded-full transition-all shadow-lg hover:-translate-y-0.5"
        >
          🌿 Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
