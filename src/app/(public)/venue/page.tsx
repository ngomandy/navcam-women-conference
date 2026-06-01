'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { ScrollReveal } from '@/components/public/ScrollReveal'

const PHOTOS = [
  { src: '/venue/venue-aerial.jpg',       captionEn: 'Outdoor grounds & event tents',     captionFr: 'Terrain extérieur & tentes événementielles' },
  { src: '/venue/venue-hall.jpg',         captionEn: 'Main conference hall',               captionFr: 'Salle de conférence principale' },
  { src: '/venue/venue-room-private.jpg', captionEn: 'Private bedroom',                   captionFr: 'Chambre privée' },
  { src: '/venue/venue-dorm.jpg',         captionEn: 'Shared dormitory',                  captionFr: 'Dortoir partagé' },
  { src: '/venue/venue-kitchen.jpg',      captionEn: 'Full kitchen',                      captionFr: 'Cuisine équipée' },
  { src: '/venue/venue-room-simple.jpg',  captionEn: 'Standard bedroom',                  captionFr: 'Chambre standard' },
  { src: '/venue/venue-bathroom.jpg',     captionEn: 'Bathroom facilities',               captionFr: 'Sanitaires' },
  { src: '/venue/venue-ch-01.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-02.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-03.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-04.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-05.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-06.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-07.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-08.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-09.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-10.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
  { src: '/venue/venue-ch-11.jpg',        captionEn: 'Care & Hope Center',                captionFr: 'Care & Hope Center' },
]

const FACILITIES = [
  { icon: '🎤', en: 'Conference Hall',       fr: 'Salle de Conférence',     desc_en: 'Spacious hall for plenary sessions, worship and ceremonies', desc_fr: 'Grande salle pour les sessions plénières, la louange et les cérémonies' },
  { icon: '🛏️', en: 'Private Rooms',         fr: 'Chambres Privées',        desc_en: 'Individual furnished bedrooms with wardrobes', desc_fr: 'Chambres individuelles meublées avec armoires' },
  { icon: '🏠', en: 'Shared Dormitories',    fr: 'Dortoirs Partagés',       desc_en: 'Bunk bed dormitories for shared accommodation', desc_fr: 'Dortoirs avec lits superposés pour l\'hébergement partagé' },
  { icon: '🍳', en: 'Full Kitchen',          fr: 'Cuisine Équipée',         desc_en: 'Large commercial kitchen for all meals', desc_fr: 'Grande cuisine commerciale pour tous les repas' },
  { icon: '🚿', en: 'Bathrooms',             fr: 'Sanitaires',              desc_en: 'Clean tiled bathroom facilities throughout', desc_fr: 'Sanitaires carrelés propres disponibles partout' },
  { icon: '🌳', en: 'Outdoor Grounds',       fr: 'Espaces Extérieurs',      desc_en: 'Large open grounds for sports, activities and outdoor events', desc_fr: 'Grands espaces ouverts pour les sports, activités et événements en plein air' },
]

const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.786!2d11.5447!3d3.8110!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bdbbcff6fc2a9%3A0xcb5cff82f71442af!2sCare%26Hope%20Center!5e0!3m2!1sen!2scm!4v1'
const MAPS_LINK   = 'https://maps.app.goo.gl/7qvQWfhFru2Y2LXG7'
const FB_LINK     = 'https://www.facebook.com/p/Care-Hope-Centre-61555523830106/'

export default function VenuePage() {
  const { lang } = useLanguage()
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div className="flex flex-col bg-[#FDF6EC]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <Image
          src="/venue/venue-aerial.jpg"
          alt="Care & Hope Center"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F2D]/90 via-[#0D1F2D]/40 to-transparent" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12 pt-32">
          <ScrollReveal>
            <p className="text-[#C9A84C] text-sm font-bold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'Conference Venue' : 'Lieu de la Conférence'}
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Care &amp; Hope Center
            </h1>
            <p className="text-[#74C69D] text-lg flex items-center gap-2">
              <span>📍</span>
              {lang === 'en' ? 'Yaoundé, Cameroon' : 'Yaoundé, Cameroun'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'About the Venue' : 'À Propos du Lieu'}
            </p>
            <h2
              className="text-3xl font-bold text-[#1B3A5C] mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'A Space for Encounter & Transformation' : 'Un Espace de Rencontre & de Transformation'}
            </h2>
            <div className="w-14 h-0.5 bg-[#C9A84C] mx-auto mb-6" />
            <p className="text-gray-600 leading-relaxed text-lg">
              {lang === 'en'
                ? 'Care & Hope Center is a dedicated retreat and conference facility in the heart of Yaoundé. With a full conference hall, private and shared accommodation, a large kitchen, and spacious outdoor grounds, it provides everything needed for an immersive 5-day gathering — all under one roof.'
                : 'Care & Hope Center est un centre de retraite et de conférence dédié au cœur de Yaoundé. Avec une grande salle de conférence, des hébergements privés et partagés, une grande cuisine et de vastes espaces extérieurs, il offre tout ce qu\'il faut pour un rassemblement immersif de 5 jours — tout sous un même toit.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                🗺️ {lang === 'en' ? 'View on Google Maps' : 'Voir sur Google Maps'}
              </a>
              <a
                href={FB_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] hover:bg-[#1465D3] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                {lang === 'en' ? 'Facebook Page' : 'Page Facebook'}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FACILITIES ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FDF6EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'What\'s Available' : 'Ce qui est Disponible'}
              </p>
              <h2
                className="text-3xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Facilities & Amenities' : 'Installations & Équipements'}
              </h2>
              <div className="w-14 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACILITIES.map((f, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#74C69D]/20 card-hover h-full">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-[#1B3A5C] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {lang === 'en' ? f.en : f.fr}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {lang === 'en' ? f.desc_en : f.desc_fr}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#C9848A] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'Take a Look Inside' : 'Découvrez l\'Intérieur'}
              </p>
              <h2
                className="text-3xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Photo Gallery' : 'Galerie Photos'}
              </h2>
              <div className="w-14 h-0.5 bg-[#C9848A] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            {PHOTOS.map((photo, i) => (
              <ScrollReveal key={i} delay={i * 30} className="break-inside-avoid mb-3 block">
                <button
                  onClick={() => setLightbox(i)}
                  className="relative overflow-hidden rounded-2xl group cursor-pointer w-full block"
                >
                  <img
                    src={photo.src}
                    alt={lang === 'en' ? photo.captionEn : photo.captionFr}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#1B3A5C]/0 group-hover:bg-[#1B3A5C]/40 transition-all duration-300 flex items-end p-3">
                    <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg px-2 py-1">
                      {lang === 'en' ? photo.captionEn : photo.captionFr}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light leading-none"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl font-light leading-none px-3"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length) }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={PHOTOS[lightbox].src}
              alt={lang === 'en' ? PHOTOS[lightbox].captionEn : PHOTOS[lightbox].captionFr}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <p className="text-center text-white/80 text-sm mt-3">
              {lang === 'en' ? PHOTOS[lightbox].captionEn : PHOTOS[lightbox].captionFr}
              <span className="text-white/40 ml-3">{lightbox + 1} / {PHOTOS.length}</span>
            </p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl font-light leading-none px-3"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % PHOTOS.length) }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}

      {/* ── MAP & LOCATION ───────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FDF6EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'Find Us' : 'Nous Trouver'}
              </p>
              <h2
                className="text-3xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Location & Directions' : 'Localisation & Itinéraire'}
              </h2>
              <div className="w-14 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Map embed */}
            <ScrollReveal direction="left" className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#74C69D]/20 h-80 lg:h-96">
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Care & Hope Center location"
                />
              </div>
            </ScrollReveal>

            {/* Info panel */}
            <ScrollReveal direction="right" className="lg:col-span-2 space-y-5">
              {/* Address */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#74C69D]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#2D6A4F] rounded-xl flex items-center justify-center text-lg flex-shrink-0">📍</div>
                  <h3 className="font-bold text-[#1B3A5C]">{lang === 'en' ? 'Address' : 'Adresse'}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Care &amp; Hope Center<br />
                  Yaoundé, Cameroun
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-[#2D6A4F] text-sm font-semibold hover:underline"
                >
                  {lang === 'en' ? 'Open in Google Maps' : 'Ouvrir dans Google Maps'} →
                </a>
              </div>

              {/* How to get there */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#74C69D]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#C9A84C] rounded-xl flex items-center justify-center text-lg flex-shrink-0">🚗</div>
                  <h3 className="font-bold text-[#1B3A5C]">{lang === 'en' ? 'Getting There' : 'Comment Venir'}</h3>
                </div>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] mt-0.5">✈</span>
                    <span>
                      {lang === 'en'
                        ? 'From Nsimalen Airport: ~30 min by taxi'
                        : 'Depuis l\'Aéroport de Nsimalen : ~30 min en taxi'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] mt-0.5">🏙️</span>
                    <span>
                      {lang === 'en'
                        ? 'From Yaoundé city centre: 15–20 min by taxi or moto'
                        : 'Depuis le centre-ville de Yaoundé : 15–20 min en taxi ou moto'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] mt-0.5">📌</span>
                    <span>
                      {lang === 'en'
                        ? 'Detailed directions will be sent to all confirmed registrants'
                        : 'Des itinéraires détaillés seront envoyés à tous les inscrits confirmés'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Need help */}
              <div className="bg-[#2D6A4F] rounded-2xl p-5 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">💬</span>
                  <h3 className="font-bold">{lang === 'en' ? 'Need Help?' : 'Besoin d\'Aide ?'}</h3>
                </div>
                <p className="text-[#74C69D] text-sm mb-3">
                  {lang === 'en'
                    ? 'Contact us on WhatsApp for directions or any travel questions.'
                    : 'Contactez-nous sur WhatsApp pour l\'itinéraire ou toute question de voyage.'}
                </p>
                <a
                  href="https://wa.me/237670546041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1EB85A] text-white text-sm font-semibold rounded-xl transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-[#74C69D] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'Join Us August 10–14, 2026' : 'Rejoignez-nous du 10 au 14 Août 2026'}
            </p>
            <h2
              className="text-3xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Ready to Register?' : 'Prête à Vous Inscrire ?'}
            </h2>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              🌿 {lang === 'en' ? 'Register Now' : "S'inscrire Maintenant"}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
