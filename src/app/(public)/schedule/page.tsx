'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { getSessionTypeColor } from '@/lib/utils'

interface Session {
  id: string
  dayNumber: number
  date: string
  startTime: string
  endTime: string
  titleEn: string
  titleFr: string
  descriptionEn?: string
  descriptionFr?: string
  type: string
  speakerNames?: string
  location?: string
  order: number
}

interface ScheduleBlock {
  time: string
  title: { en: string; fr: string }
  subtitle?: { en: string; fr: string }
  items?: { en: string[]; fr: string[] }
}

interface ScheduleDay {
  day: number
  date: { en: string; fr: string }
  theme: { en: string; fr: string }
  blocks: ScheduleBlock[]
}

const fullScheduleData: ScheduleDay[] = [
  {
    day: 1,
    date: { en: 'Monday, August 10', fr: 'Lundi, 10 Août' },
    theme: { en: 'Rooted in Christ', fr: 'Enracinées en Christ' },
    blocks: [
      {
        time: '2:00 PM – 6:00 PM',
        title: { en: 'Arrival & Registration', fr: 'Arrivée & Inscription' },
        items: {
          en: ['Welcome desk & reception', 'Registration & check-in', 'Room allocation', 'Conference packs distribution', 'Refreshments', 'Fellowship & reconnection'],
          fr: ["Bureau d'accueil & réception", 'Inscription & enregistrement', 'Attribution des chambres', 'Distribution des documents de conférence', 'Rafraîchissements', 'Fraternité & retrouvailles'],
        },
      },
      {
        time: '6:00 PM – 7:00 PM',
        title: { en: 'Dinner', fr: 'Dîner' },
      },
      {
        time: '7:30 PM – 9:30 PM',
        title: { en: 'Opening Ceremony & Worship Night', fr: "Cérémonie d'Ouverture & Nuit de Louange" },
        subtitle: { en: 'Theme: Planted in Christ', fr: 'Thème : Plantées en Christ' },
        items: {
          en: ['Opening prayer', 'Welcome procession', 'Word of Welcome by the Conference Director', 'Official opening', 'Presentation of theme: Rooted in Christ, Bearing Lasting Fruits', 'Vision casting for the conference', 'Praise & worship', 'Keynote message', 'Testimony of the Day', 'Prayer of consecration'],
          fr: ["Prière d'ouverture", "Procession d'accueil", 'Mot de bienvenue de la Directrice de la Conférence', 'Ouverture officielle', 'Présentation du thème : Enracinées en Christ, Portant des Fruits Durables', 'Vision de la conférence', 'Louange & adoration', 'Message principal', 'Témoignage du Jour', 'Prière de consécration'],
        },
      },
    ],
  },
  {
    day: 2,
    date: { en: 'Tuesday, August 11', fr: 'Mardi, 11 Août' },
    theme: { en: 'Roots That Heal & Deepen', fr: 'Des Racines qui Guérissent & Approfondissent' },
    blocks: [
      {
        time: '5:30 AM – 6:30 AM',
        title: { en: 'Morning Sports & Wellness', fr: 'Sports Matinaux & Bien-être' },
        items: {
          en: ['Walking', 'Stretching', 'Aerobics', 'Praise dance', 'Light jogging'],
          fr: ['Marche', 'Étirements', 'Aérobic', 'Danse de louange', 'Jogging léger'],
        },
      },
      {
        time: '6:30 AM – 7:15 AM',
        title: { en: 'Morning Devotion', fr: 'Dévotion Matinale' },
      },
      {
        time: '7:30 AM – 8:30 AM',
        title: { en: 'Breakfast', fr: 'Petit-déjeuner' },
      },
      {
        time: '9:00 AM – 10:30 AM',
        title: { en: 'Plenary 1 — Deep Roots, Stable Life', fr: 'Plénière 1 — Racines Profondes, Vie Stable' },
        items: {
          en: ['Abiding in Christ', 'Spiritual depth', 'Inner stability in God'],
          fr: ['Demeurer en Christ', 'Profondeur spirituelle', 'Stabilité intérieure en Dieu'],
        },
      },
      {
        time: '11:00 AM – 12:30 PM',
        title: { en: 'Breakout Sessions — Round 1 (6 Options)', fr: 'Ateliers — Ronde 1 (6 Options)' },
        items: {
          en: ['Identity in Christ', 'Emotional Healing & Inner Restoration', 'Prayer & Intimacy with God', 'Women & Discipleship', 'Singleness, Waiting & Trusting God', 'Faith, Work & Purpose in Everyday Life'],
          fr: ['Identité en Christ', 'Guérison Émotionnelle & Restauration Intérieure', 'Prière & Intimité avec Dieu', 'Femmes & Discipulat', 'Célibat, Attente & Confiance en Dieu', 'Foi, Travail & But dans la Vie Quotidienne'],
        },
      },
      {
        time: '12:30 PM – 2:00 PM',
        title: { en: 'Lunch', fr: 'Déjeuner' },
      },
      {
        time: '2:00 PM – 3:30 PM',
        title: { en: 'Plenary 2 — The Life of the Vine', fr: 'Plénière 2 — La Vie du Cep' },
        items: {
          en: ['Fruitfulness through abiding', 'Dependence on Christ', 'Spirit-led living'],
          fr: ['Fructification en demeurant', 'Dépendance en Christ', 'Vie conduite par le Saint-Esprit'],
        },
      },
      {
        time: '3:45 PM – 5:00 PM',
        title: { en: 'Panel Discussion 1 — Healing, Identity & Inner Wholeness', fr: 'Table Ronde 1 — Guérison, Identité & Plénitude Intérieure' },
      },
      {
        time: '5:00 PM – 5:20 PM',
        title: { en: 'Testimony of the Day', fr: 'Témoignage du Jour' },
      },
      {
        time: '6:00 PM – 7:00 PM',
        title: { en: 'Dinner', fr: 'Dîner' },
      },
      {
        time: '7:30 PM – 9:30 PM',
        title: { en: 'Evening Ministry Night', fr: 'Soirée de Ministère' },
        items: {
          en: ['Worship', 'Healing prayer', 'Testimonies', 'Ministry time'],
          fr: ['Louange', 'Prière de guérison', 'Témoignages', 'Temps de ministère'],
        },
      },
    ],
  },
  {
    day: 3,
    date: { en: 'Wednesday, August 12', fr: 'Mercredi, 12 Août' },
    theme: { en: 'Bearing Lasting Fruits', fr: 'Porter des Fruits Durables' },
    blocks: [
      {
        time: '5:30 AM – 6:30 AM',
        title: { en: 'Morning Sports & Wellness', fr: 'Sports Matinaux & Bien-être' },
      },
      {
        time: '6:30 AM – 7:15 AM',
        title: { en: 'Morning Devotion', fr: 'Dévotion Matinale' },
      },
      {
        time: '7:30 AM – 8:30 AM',
        title: { en: 'Breakfast', fr: 'Petit-déjeuner' },
      },
      {
        time: '9:00 AM – 10:30 AM',
        title: { en: 'Plenary 3 — Lasting Fruit', fr: 'Plénière 3 — Fruits Durables' },
        items: {
          en: ['Character fruit', 'Discipleship fruit', 'Legacy fruit'],
          fr: ['Fruit du caractère', 'Fruit du discipulat', 'Fruit de l\'héritage'],
        },
      },
      {
        time: '11:00 AM – 12:30 PM',
        title: { en: 'Breakout Sessions — Round 2 (6 Options)', fr: 'Ateliers — Ronde 2 (6 Options)' },
        items: {
          en: ['Marriage & Family Fruitfulness', 'Leadership & Influence', 'Purpose & Calling', 'Faithful Stewardship', 'Mentorship Across Generations', 'Missions & Disciple-Making'],
          fr: ['Fécondité dans le Mariage & la Famille', 'Leadership & Influence', 'But & Vocation', 'Intendance Fidèle', 'Mentorat Entre les Générations', 'Missions & Discipulat'],
        },
      },
      {
        time: '12:30 PM – 1:30 PM',
        title: { en: 'Lunch', fr: 'Déjeuner' },
      },
      {
        time: '2:00 PM – 3:00 PM',
        title: { en: 'Panel Discussion 2 — Women, Calling & Influence', fr: 'Table Ronde 2 — Femmes, Vocation & Influence' },
      },
      {
        time: '3:00 PM – 3:30 PM',
        title: { en: 'Testimony of the Day', fr: 'Témoignage du Jour' },
      },
      {
        time: '3:30 PM – 6:00 PM',
        title: { en: 'Excursion & Sisterhood Afternoon', fr: 'Excursion & Après-midi de Sororité' },
        items: {
          en: ['Relaxation', 'Games', 'Fellowship', 'Sharing circles', 'Photos'],
          fr: ['Détente', 'Jeux', 'Fraternité', 'Cercles de partage', 'Photos'],
        },
      },
      {
        time: '8:00 PM – 10:30 PM',
        title: { en: 'Worship Night & Celebration Party — Joyful Fruitfulness', fr: 'Nuit de Louange & Soirée de Célébration — Fécondité Joyeuse' },
        items: {
          en: ['Worship', 'Dance', 'Celebration', 'Cultural expressions', 'Testimonies'],
          fr: ['Louange', 'Danse', 'Célébration', 'Expressions culturelles', 'Témoignages'],
        },
      },
    ],
  },
  {
    day: 4,
    date: { en: 'Thursday, August 13', fr: 'Jeudi, 13 Août' },
    theme: { en: 'Sent to Bear Fruit', fr: 'Envoyées pour Porter du Fruit' },
    blocks: [
      {
        time: '5:30 AM – 6:30 AM',
        title: { en: 'Morning Sports & Wellness', fr: 'Sports Matinaux & Bien-être' },
      },
      {
        time: '6:30 AM – 7:15 AM',
        title: { en: 'Morning Devotion', fr: 'Dévotion Matinale' },
      },
      {
        time: '7:30 AM – 8:30 AM',
        title: { en: 'Breakfast', fr: 'Petit-déjeuner' },
      },
      {
        time: '9:00 AM – 10:30 AM',
        title: { en: 'Final Plenary — Sent to Bear Fruit That Remains', fr: 'Plénière Finale — Envoyées pour Porter des Fruits Qui Demeurent' },
        items: {
          en: ['Mission', 'Multiplication', 'Daily fruitfulness'],
          fr: ['Mission', 'Multiplication', 'Fécondité quotidienne'],
        },
      },
      {
        time: '11:00 AM – 12:30 PM',
        title: { en: 'Reflection & Prayer Groups', fr: 'Groupes de Réflexion & de Prière' },
        items: {
          en: ['Journaling', 'Commitments', 'Prayer circles'],
          fr: ['Journal de bord', 'Engagements', 'Cercles de prière'],
        },
      },
      {
        time: '12:30 PM – 1:30 PM',
        title: { en: 'Lunch', fr: 'Déjeuner' },
      },
      {
        time: '2:30 PM – 4:00 PM',
        title: { en: 'Panel Discussion 3 — Bearing Fruit Beyond the Conference', fr: 'Table Ronde 3 — Porter du Fruit Au-delà de la Conférence' },
      },
      {
        time: '4:00 PM – 4:30 PM',
        title: { en: 'Testimony of the Day', fr: 'Témoignage du Jour' },
      },
      {
        time: '4:30 PM – 6:00 PM',
        title: { en: 'Optional Activities', fr: 'Activités Optionnelles' },
        items: {
          en: ['Mentorship', 'Networking', 'Prayer appointments'],
          fr: ['Mentorat', 'Réseautage', 'Rendez-vous de prière'],
        },
      },
      {
        time: '6:30 PM – 9:30 PM',
        title: { en: 'Closing Gala Night — The Harvest Table', fr: 'Soirée de Gala de Clôture — La Table de la Moisson' },
        subtitle: { en: 'Thanksgiving & Celebration Night: Rooted Together, Bearing Fruit Forever', fr: 'Soirée de Thanksgiving & Célébration : Enracinées Ensemble, Portant du Fruit pour Toujours' },
        items: {
          en: ['6:30 PM — Welcome Dinner & Reception (elegant dinner, worship ambience, photo moments, table reflection cards)', '7:15 PM — Gala Opening Remarks', '7:25 PM — Thanksgiving Worship Set', '7:50 PM — Special Number: "The Journey of the Seed" (Creative Worship Dance)', '8:05 PM — Testimonies: The Fruit I Carry Home', '8:30 PM — Collective Choreography: "Rooted Together" — 100 women unified movement', '8:50 PM — Thanksgiving Ceremony: "Harvest Offering Moment"', '9:10 PM — Final Blessing & Commissioning Prayer', '9:20 PM — Final Celebration Song', '9:30 PM — Close'],
          fr: ['18h30 — Dîner de Bienvenue & Réception (dîner élégant, ambiance de louange, moments photos, cartes de réflexion)', '19h15 — Remarques d\'Ouverture du Gala', '19h25 — Louange de Thanksgiving', '19h50 — Numéro Spécial : "Le Voyage de la Graine" (Danse de Louange Créative)', '20h05 — Témoignages : Le Fruit que je Ramène à la Maison', '20h30 — Chorégraphie Collective : "Enracinées Ensemble" — 100 femmes en mouvement unifié', '20h50 — Cérémonie de Thanksgiving : "Moment d\'Offrande de la Moisson"', '21h10 — Bénédiction Finale & Prière de Commissionnement', '21h20 — Chant de Célébration Final', '21h30 — Clôture'],
        },
      },
    ],
  },
  {
    day: 5,
    date: { en: 'Friday, August 14', fr: 'Vendredi, 14 Août' },
    theme: { en: 'Commissioned to Bear Lasting Fruit', fr: 'Commissionnées pour Porter des Fruits Durables' },
    blocks: [
      {
        time: '7:00 AM – 8:00 AM',
        title: { en: 'Breakfast', fr: 'Petit-déjeuner' },
      },
      {
        time: '8:30 AM – 9:30 AM',
        title: { en: 'Evaluation & Feedback', fr: 'Évaluation & Retours' },
      },
      {
        time: '9:30 AM – 11:30 AM',
        title: { en: 'Commissioning Service', fr: 'Service de Commissionnement' },
        items: {
          en: ['Worship', 'Sending prayer', 'Blessings', 'Commitments', 'Final Testimony Moment: "What I am taking home"', 'Conference Declaration: Rooted in Christ, Bearing Lasting Fruits'],
          fr: ['Louange', 'Prière d\'envoi', 'Bénédictions', 'Engagements', 'Moment de Témoignage Final : "Ce que je ramène à la maison"', 'Déclaration de la Conférence : Enracinées en Christ, Portant des Fruits Durables'],
        },
      },
    ],
  },
]

export default function SchedulePage() {
  const { t, lang } = useLanguage()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState(1)
  const [showFullSchedule, setShowFullSchedule] = useState(false)

  useEffect(() => {
    fetch('/api/sessions')
      .then((r) => r.json())
      .then((data) => {
        setSessions(data.sessions || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const days = [1, 2, 3, 4, 5]
  const dayDates = ['August 10', 'August 11', 'August 12', 'August 13', 'August 14']
  const dayDatesFr = ['10 Août', '11 Août', '12 Août', '13 Août', '14 Août']

  const sessionsByDay = days.reduce<Record<number, Session[]>>((acc, day) => {
    acc[day] = sessions.filter((s) => s.dayNumber === day).sort((a, b) => a.order > b.order ? 1 : -1)
    return acc
  }, {})

  const getTypeLabel = (type: string) => {
    const types = t.schedule.sessionTypes as Record<string, string>
    return types[type] || type
  }

  const dayNote: Record<number, { en: string; fr: string }> = {
    5: { en: 'Closes 12:00 PM', fr: 'Clôture à 12h00' },
  }

  const dayColors = ['bg-[#40916C]', 'bg-[#2D6A4F]', 'bg-[#C9848A]', 'bg-[#C9A84C]', 'bg-[#1B3A5C]']
  const dayIcons = ['🌱', '🌿', '🍃', '✨', '🕊️']

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaves" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 5 Q55 25 40 45 Q25 25 40 5Z" fill="#74C69D" opacity="0.8" />
                <path d="M5 40 Q25 25 45 40 Q25 55 5 40Z" fill="#74C69D" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaves)" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="text-5xl block mb-3">📋</span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.schedule.title}
          </h1>
          <p className="text-[#74C69D] text-lg">{t.schedule.subtitle}</p>
          <p className="text-[#C9A84C] text-sm mt-2">{t.conference.dates} • {t.conference.venue}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Day Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {days.map((day, idx) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeDay === day
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'bg-white text-[#1B3A5C] hover:bg-[#74C69D]/20 border border-[#74C69D]/30'
              }`}
            >
              <div className="font-bold">
                {lang === 'en' ? `Day ${day}` : `Jour ${day}`}
              </div>
              <div className={`text-xs mt-0.5 ${activeDay === day ? 'text-[#74C69D]' : 'text-gray-400'}`}>
                {lang === 'en' ? dayDates[idx] : dayDatesFr[idx]}
              </div>
            </button>
          ))}
        </div>

        {/* Active Day Header */}
        <div className="bg-white rounded-2xl p-5 mb-6 border border-[#74C69D]/20 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2
                className="text-xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en'
                  ? `Day ${activeDay} — ${dayDates[activeDay - 1]}`
                  : `Jour ${activeDay} — ${dayDatesFr[activeDay - 1]}`}
              </h2>
              <p className="text-[#40916C] text-sm mt-0.5 italic">
                {t.schedule.dayThemes[activeDay - 1]}
              </p>
            </div>
            {dayNote[activeDay] && (
              <span className="text-xs bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1 rounded-full font-medium">
                {lang === 'en' ? dayNote[activeDay].en : dayNote[activeDay].fr}
              </span>
            )}
          </div>
        </div>

        {/* Sessions Timeline */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-gray-500">{t.admin.loading}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(sessionsByDay[activeDay] || []).length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                {t.admin.noData}
              </div>
            ) : (
              (sessionsByDay[activeDay] || []).map((session, i) => (
                <div
                  key={session.id}
                  className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-[#74C69D]/20 card-hover animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-[#2D6A4F] font-bold text-sm">{session.startTime}</div>
                    <div className="text-gray-400 text-xs">–</div>
                    <div className="text-gray-500 text-xs">{session.endTime}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] mt-1 flex-shrink-0" />
                    <div className="w-0.5 flex-1 bg-[#74C69D]/30 mt-1" />
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="text-[#1B3A5C] font-semibold text-sm leading-snug">
                        {lang === 'en' ? session.titleEn : session.titleFr}
                      </h3>
                      <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${getSessionTypeColor(session.type)}`}>
                        {getTypeLabel(session.type)}
                      </span>
                    </div>
                    {(lang === 'en' ? session.descriptionEn : session.descriptionFr) && (
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                        {lang === 'en' ? session.descriptionEn : session.descriptionFr}
                      </p>
                    )}
                    {session.speakerNames && (
                      <p className="text-[#C9848A] text-xs mt-1 flex items-center gap-1">
                        <span>🎤</span> {session.speakerNames}
                      </p>
                    )}
                    {session.location && (
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <span>📍</span> {session.location}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 p-4 bg-white rounded-2xl border border-[#74C69D]/20">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {lang === 'en' ? 'Session Types' : 'Types de Sessions'}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(t.schedule.sessionTypes).map(([key, label]) => (
              <span key={key} className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSessionTypeColor(key)}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Full Schedule Toggle */}
        <div className="mt-10">
          <button
            onClick={() => setShowFullSchedule(!showFullSchedule)}
            className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#2D6A4F] to-[#1B3A5C] text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📖</span>
              <div className="text-left">
                <p className="font-bold">
                  {lang === 'en' ? 'Full Conference Programme' : 'Programme Complet de la Conférence'}
                </p>
                <p className="text-[#74C69D] text-xs font-normal">
                  {lang === 'en' ? 'All 5 days — detailed schedule' : '5 jours complets — programme détaillé'}
                </p>
              </div>
            </div>
            <span className={`text-2xl transition-transform duration-300 ${showFullSchedule ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </button>

          {showFullSchedule && (
            <div className="mt-4 space-y-6 animate-fade-in">
              {fullScheduleData.map((dayData) => (
                <div key={dayData.day} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#74C69D]/20">
                  {/* Day Header */}
                  <div className={`${dayColors[dayData.day - 1]} px-6 py-4 flex items-center gap-3`}>
                    <span className="text-2xl">{dayIcons[dayData.day - 1]}</span>
                    <div>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {lang === 'en' ? `Day ${dayData.day} — ${dayData.date.en}` : `Jour ${dayData.day} — ${dayData.date.fr}`}
                      </p>
                      <p className="text-white/75 text-sm italic">
                        {lang === 'en' ? dayData.theme.en : dayData.theme.fr}
                      </p>
                    </div>
                  </div>

                  {/* Blocks */}
                  <div className="divide-y divide-[#74C69D]/10">
                    {dayData.blocks.map((block, bi) => (
                      <div key={bi} className="px-6 py-4 flex gap-4">
                        <div className="flex-shrink-0 w-36 text-right">
                          <span className="text-[#2D6A4F] font-bold text-xs leading-snug">{block.time}</span>
                        </div>
                        <div className="flex flex-col items-center pt-1">
                          <div className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                          {bi < dayData.blocks.length - 1 && (
                            <div className="w-0.5 flex-1 bg-[#74C69D]/20 mt-1 min-h-[16px]" />
                          )}
                        </div>
                        <div className="flex-1 pb-1">
                          <p className="text-[#1B3A5C] font-semibold text-sm">
                            {lang === 'en' ? block.title.en : block.title.fr}
                          </p>
                          {block.subtitle && (
                            <p className="text-[#40916C] text-xs italic mt-0.5">
                              {lang === 'en' ? block.subtitle.en : block.subtitle.fr}
                            </p>
                          )}
                          {block.items && block.items[lang].length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {block.items[lang].map((item, ii) => (
                                <li key={ii} className="text-gray-500 text-xs flex items-start gap-2">
                                  <span className="text-[#C9A84C] mt-0.5 flex-shrink-0">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
