'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { AnimatedCounter } from '@/components/public/AnimatedCounter'

// ── Photos ────────────────────────────────────────────────────────────────────
const PHOTOS = Array.from({ length: 36 }, (_, i) => `/2025conf/conf-${String(i + 1).padStart(2, '0')}.jpg`)

// ── Videos ────────────────────────────────────────────────────────────────────
const VIDEOS = [
  { src: '/2025conf/video-01.mp4', poster: '/2025conf/conf-01.jpg' },
  { src: '/2025conf/video-02.mp4', poster: '/2025conf/conf-07.jpg' },
  { src: '/2025conf/video-03.mp4', poster: '/2025conf/conf-10.jpg' },
  { src: '/2025conf/video-04.mp4', poster: '/2025conf/conf-14.jpg' },
  { src: '/2025conf/video-05.mp4', poster: '/2025conf/conf-18.jpg' },
  { src: '/2025conf/video-06.mp4', poster: '/2025conf/conf-22.jpg' },
  { src: '/2025conf/video-07.mp4', poster: '/2025conf/conf-27.jpg' },
  { src: '/2025conf/video-08.mp4', poster: '/2025conf/conf-31.jpg' },
  { src: '/2025conf/video-09.mp4', poster: '/2025conf/conf-36.jpg' },
]

// ── Report excerpts ───────────────────────────────────────────────────────────
const EXCERPTS = [
  {
    icon: '🎯',
    titleEn: 'Conference Objectives',
    titleFr: 'Objectifs de la Conférence',
    contentEn: [
      'Awareness — Help older women recognise their biblical mandate and the urgent need to disciple, while helping younger women understand their value and place in God\'s design.',
      'Calling — Guide both older and younger women in discovering their unique calling, whether as mentors or as young leaders growing in Christ.',
      'Example — Encourage all women to model holiness, reverence, and self-control, becoming examples and encouragers to one another.',
      'Connection — Foster meaningful intergenerational relationships and celebrate the beauty and strength of mutual learning and growth.',
      'Urgency — Address the challenges faced by younger women today.',
      'Growth — Emphasise the need for continual learning and transformation to remain relevant and impactful.',
      'Availability — Affirm that God uses willing hearts at every stage of life.',
    ],
    contentFr: [
      'Sensibilisation — Aider les femmes plus âgées à reconnaître leur mandat biblique et le besoin urgent de faire des disciples, tout en aidant les jeunes femmes à comprendre leur valeur et leur place dans le dessein de Dieu.',
      'Vocation — Guider les femmes, jeunes et âgées, dans la découverte de leur vocation unique, qu\'elles soient mentors ou jeunes leaders en croissance en Christ.',
      'Exemple — Encourager toutes les femmes à modéliser la sainteté, la révérence et la maîtrise de soi, en devenant des exemples et des encourageuses les unes pour les autres.',
      'Connexion — Favoriser des relations intergénérationnelles significatives et célébrer la beauté et la force de l\'apprentissage mutuel.',
      'Urgence — Aborder les défis auxquels font face les jeunes femmes d\'aujourd\'hui.',
      'Croissance — Souligner le besoin de transformation continue pour rester pertinentes et avoir un impact.',
      'Disponibilité — Affirmer que Dieu utilise des cœurs disponibles à chaque étape de la vie.',
    ],
  },
  {
    icon: '✨',
    titleEn: 'Impact of the Conference',
    titleFr: 'Impact de la Conférence',
    contentEn: [
      'Women empowered to mentor others across generations.',
      'Spiritual encouragement and restoration of broken relationships.',
      'New inter-regional networks created among participants.',
      'Over 30 women committed to implementing what they learned.',
      '2.1 million FCFA raised in just 3 months, with over 50% contributed by the women themselves.',
      '66 participants from 8 regions, representing 4 generations.',
    ],
    contentFr: [
      'Des femmes habilitées à encadrer les autres à travers les générations.',
      'Encouragement spirituel et restauration des relations brisées.',
      'De nouveaux réseaux inter-régionaux créés entre les participantes.',
      'Plus de 30 femmes engagées à mettre en œuvre ce qu\'elles ont appris.',
      '2,1 millions de FCFA collectés en seulement 3 mois, dont plus de 50% contribués par les femmes elles-mêmes.',
      '66 participantes de 8 régions, représentant 4 générations.',
    ],
  },
  {
    icon: '💬',
    titleEn: 'Voices from Participants',
    titleFr: 'Voix des Participantes',
    contentEn: [
      '"I am a wonderful woman called to not remain silent so that generations can rise and be blessed."',
      '"To raise the next generation I must be on my knees."',
      '"Impact is seen and not discussed."',
      '"Love must be loving and active. For the gospel to go through."',
    ],
    contentFr: [
      '« Je suis une femme merveilleuse appelée à ne pas rester silencieuse afin que les générations puissent s\'élever et être bénies. »',
      '« Pour élever la prochaine génération, je dois être à genoux. »',
      '« L\'impact se voit et ne se discute pas. »',
      '« L\'amour doit être aimant et actif. Pour que l\'évangile passe. »',
    ],
  },
  {
    icon: '🚀',
    titleEn: 'Perspectives & Next Steps',
    titleFr: 'Perspectives & Prochaines Étapes',
    contentEn: [
      'Follow-up Discipleship Framework — Identify the 30+ women who expressed desire to act and provide coaching, accountability groups, or leadership training.',
      'Regional Clusters & Check-ins — Schedule quarterly virtual or in-person check-ins to track growth, share testimonies, and provide encouragement.',
      'Mentorship Roadmap — Develop a mentorship programme pairing older and younger women regionally or across regions.',
      'Documentation & Storytelling — Capture more testimonies to highlight ongoing transformation for encouragement and fundraising.',
      'Plan Next Gathering — Annual national conference or rotating regional conferences leading up to the 2026 national one.',
    ],
    contentFr: [
      'Cadre de Discipolat de Suivi — Identifier les 30+ femmes qui ont exprimé leur désir d\'agir et leur fournir coaching, groupes de responsabilité ou formation au leadership.',
      'Clusters Régionaux & Bilans — Planifier des bilans trimestriels virtuels ou en personne pour suivre la croissance, partager des témoignages et encourager.',
      'Feuille de Route du Mentorat — Développer un programme de mentorat jumelant femmes âgées et jeunes, régionalement ou inter-régionalement.',
      'Documentation & Témoignages — Capturer plus de témoignages pour mettre en évidence la transformation en cours, pour l\'encouragement et la collecte de fonds.',
      'Planifier le Prochain Rassemblement — Conférence nationale annuelle ou conférences régionales tournantes menant à celle de 2026.',
    ],
  },
]

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 66,  suffix: '',  icon: '👩‍👩‍👧', labelEn: 'Participants',         labelFr: 'Participantes' },
  { value: 8,   suffix: '',  icon: '🌍', labelEn: 'Regions',               labelFr: 'Régions' },
  { value: 4,   suffix: '',  icon: '🌱', labelEn: 'Generations',            labelFr: 'Générations' },
  { value: 30,  suffix: '+', icon: '🤝', labelEn: 'Women Committed',        labelFr: 'Femmes Engagées' },
]

export default function Edition2025Page() {
  const { lang } = useLanguage()
  const [openExcerpt, setOpenExcerpt] = useState<number | null>(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div className="flex flex-col bg-[#FDF6EC]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <Image
          src="/2025conf/conf-36.jpg"
          alt="2025 Navigators National Women's Conference"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F2D]/95 via-[#0D1F2D]/50 to-[#0D1F2D]/10" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-14 pt-32">
          <ScrollReveal>
            <span className="inline-block bg-[#C9A84C] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {lang === 'en' ? 'Previous Edition' : 'Édition Précédente'}
            </span>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? "2025 Navigators National Women's Conference" : 'Conférence Nationale des Femmes Navigateurs 2025'}
            </h1>
            <p className="text-[#F4C2C2] text-xl italic mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? '"Raising Women of Impact: Discipling the Next Generation"' : '« Élever des Femmes d\'Impact : Faire le Discipolat de la Prochaine Génération »'}
            </p>
            <p className="text-[#74C69D] text-sm">
              📅 {lang === 'en' ? 'August 14–17, 2025' : '14–17 Août 2025'} &nbsp;·&nbsp; 📍 Yaoundé, Cameroun
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#2D6A4F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {STATS.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div
                    className="text-3xl sm:text-4xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <AnimatedCounter target={s.value} suffix={s.suffix} duration={1000 + i * 150} />
                  </div>
                  <p className="text-[#74C69D] text-sm mt-1 font-medium">
                    {lang === 'en' ? s.labelEn : s.labelFr}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-8 text-center">
              <p className="text-[#C9A84C] text-lg font-bold">
                {lang === 'en' ? '2.1 million FCFA raised in 3 months' : '2,1 millions de FCFA collectés en 3 mois'}
              </p>
              <p className="text-[#74C69D] text-sm mt-1">
                {lang === 'en' ? 'with over 50% contributed by the women themselves' : 'dont plus de 50% contribués par les femmes elles-mêmes'}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── THEME & SPEAKER ──────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
                {lang === 'en' ? 'Conference Theme' : 'Thème de la Conférence'}
              </p>
              <h2
                className="text-3xl font-bold text-[#1B3A5C] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Raising Women of Impact' : 'Élever des Femmes d\'Impact'}
              </h2>
              <div className="w-14 h-0.5 bg-[#C9A84C] mb-5" />
              <div className="bg-[#FDF6EC] rounded-2xl p-5 border border-[#74C69D]/20 mb-5">
                <p className="text-[#2D6A4F] text-sm font-bold uppercase tracking-wider mb-2">Titus 2:3–5</p>
                <p className="text-gray-700 italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {lang === 'en'
                    ? '"Older women… teach what is good. Then they can urge the younger women…"'
                    : '« Les femmes plus âgées… enseignent ce qui est bien. Elles pourront alors exhorter les jeunes femmes… »'}
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'en'
                  ? 'The conference centred on mentoring, generational discipolat, and lasting impact — bringing together women from 4 generations across 8 regions of Cameroon.'
                  : 'La conférence était centrée sur le mentorat, le discipolat intergénérationnel et l\'impact durable — réunissant des femmes de 4 générations à travers 8 régions du Cameroun.'}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative mb-8 lg:mb-0">
                <div className="relative w-full aspect-[4/3] min-h-[300px] rounded-2xl shadow-xl overflow-hidden bg-[#1B3A5C]/10">
                  <Image
                    src="/2025conf/conf-01.jpg"
                    alt="2025 Navigators Women's Conference"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#2D6A4F] text-white rounded-2xl p-4 shadow-xl max-w-xs">
                  <p className="italic text-sm leading-relaxed mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {lang === 'en'
                      ? '"This is not just a gathering of beautiful women — there is a purpose in our calling as Navigators."'
                      : '« Ce n\'est pas seulement un rassemblement de belles femmes — il y a un but dans notre vocation de Navigateurs. »'}
                  </p>
                  <p className="text-[#C9A84C] text-xs font-bold">— Toyin Ogundele, {lang === 'en' ? 'Conference Speaker' : 'Conférencière'}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── REPORT EXCERPTS ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FDF6EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'Conference Report' : 'Rapport de Conférence'}
              </p>
              <h2
                className="text-3xl font-bold text-[#1B3A5C] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Key Highlights' : 'Points Clés'}
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                {lang === 'en'
                  ? 'Excerpts from the official 2025 conference report. Download the full document below.'
                  : 'Extraits du rapport officiel de la conférence 2025. Téléchargez le document complet ci-dessous.'}
              </p>
              <div className="w-14 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {EXCERPTS.map((excerpt, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-[#74C69D]/20 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenExcerpt(openExcerpt === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#FDF6EC]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{excerpt.icon}</span>
                      <span
                        className="font-bold text-[#1B3A5C] text-base"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {lang === 'en' ? excerpt.titleEn : excerpt.titleFr}
                      </span>
                    </div>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-[#2D6A4F] flex items-center justify-center text-[#2D6A4F] font-bold transition-transform duration-300 ${
                        openExcerpt === i ? 'rotate-45 bg-[#2D6A4F] text-white border-[#2D6A4F]' : ''
                      }`}
                      style={{ color: openExcerpt === i ? 'white' : undefined }}
                    >
                      +
                    </span>
                  </button>

                  {openExcerpt === i && (
                    <div className="px-6 pb-6 border-t border-[#74C69D]/10">
                      <ul className="mt-4 space-y-3">
                        {(lang === 'en' ? excerpt.contentEn : excerpt.contentFr).map((point, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                            <span className="text-[#C9A84C] mt-1 flex-shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Download CTA */}
          <ScrollReveal delay={200}>
            <div className="mt-10 bg-gradient-to-br from-[#1B3A5C] to-[#2D6A4F] rounded-3xl p-8 text-center text-white">
              <div className="text-4xl mb-3">📄</div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Download the Full Report' : 'Télécharger le Rapport Complet'}
              </h3>
              <p className="text-[#74C69D] text-sm mb-6">
                {lang === 'en'
                  ? '15-page official report — objectives, schedule overview, testimonies, impact data & next steps'
                  : 'Rapport officiel de 15 pages — objectifs, aperçu du programme, témoignages, données d\'impact & prochaines étapes'}
              </p>
              <a
                href="/2025conf/2025-conference-report.pdf"
                download="2025-NavCam-Womens-Conference-Report.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                ⬇️ {lang === 'en' ? 'Download PDF Report' : 'Télécharger le Rapport PDF'}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PHOTO GALLERY ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#C9848A] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'Memories' : 'Souvenirs'}
              </p>
              <h2
                className="text-3xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Conference Gallery' : 'Galerie de la Conférence'}
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                {lang === 'en' ? `${PHOTOS.length} photos — click to enlarge` : `${PHOTOS.length} photos — cliquez pour agrandir`}
              </p>
              <div className="w-14 h-0.5 bg-[#C9848A] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {PHOTOS.map((src, i) => (
              <ScrollReveal key={i} delay={(i % 6) * 50}>
                <button
                  onClick={() => setLightbox(i)}
                  className={`relative overflow-hidden rounded-xl group cursor-pointer block w-full ${
                    i === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                  style={{ aspectRatio: '1/1' }}
                >
                  <Image
                    src={src}
                    alt={`2025 Conference photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-[#1B3A5C]/0 group-hover:bg-[#1B3A5C]/20 transition-all duration-300" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-5 text-white/70 hover:text-white text-4xl font-light"
            onClick={() => setLightbox(null)}
          >×</button>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl font-light px-3 py-4"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length) }}
          >‹</button>
          <div className="max-h-[88vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={PHOTOS[lightbox]}
              alt={`Conference photo ${lightbox + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            />
            <p className="text-center text-white/50 text-xs mt-2">
              {lightbox + 1} / {PHOTOS.length}
            </p>
          </div>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl font-light px-3 py-4"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % PHOTOS.length) }}
          >›</button>
        </div>
      )}

      {/* ── VIDEO GALLERY ────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[#2D6A4F] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'In Motion' : 'En Mouvement'}
              </p>
              <h2
                className="text-3xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Conference Videos' : 'Vidéos de la Conférence'}
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                {lang === 'en' ? `${VIDEOS.length} clips` : `${VIDEOS.length} clips`}
              </p>
              <div className="w-14 h-0.5 bg-[#2D6A4F] mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {VIDEOS.map((video, i) => (
              <ScrollReveal key={i} delay={(i % 3) * 100}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#74C69D]/20">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    preload="none"
                    playsInline
                    className="w-full aspect-[9/16] object-cover bg-[#0D1F2D]"
                    aria-label={`${lang === 'en' ? 'Conference video' : 'Vidéo de la conférence'} ${i + 1}`}
                  />
                  <div className="px-4 py-2.5 flex items-center gap-2">
                    <span className="text-[#2D6A4F]">🎬</span>
                    <p className="text-[#1B3A5C] text-sm font-medium">
                      {lang === 'en' ? `Clip ${i + 1}` : `Clip ${i + 1}`}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-5xl mb-4">🌿</p>
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Be Part of the 2026 Edition' : 'Participez à l\'Édition 2026'}
            </h2>
            <p className="text-[#74C69D] text-lg mb-8">
              {lang === 'en'
                ? '"Rooted in Christ, Bearing Lasting Fruit" — August 10–14, 2026 · Yaoundé'
                : '« Enracinées en Christ, Portant du Fruit qui Demeure » — 10–14 août 2026 · Yaoundé'}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              🌿 {lang === 'en' ? 'Register for 2026' : "S'inscrire pour 2026"}
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
