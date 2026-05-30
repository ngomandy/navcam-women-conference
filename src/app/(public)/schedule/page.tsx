'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

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
    theme: { en: 'Rooted in Christ — Arrival & Welcome', fr: 'Enracinées en Christ — Arrivée & Accueil' },
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
          fr: ['Fruit du caractère', 'Fruit du discipulat', "Fruit de l'héritage"],
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
        subtitle: { en: 'Thanksgiving & Celebration: Rooted Together, Bearing Fruit Forever', fr: 'Thanksgiving & Célébration : Enracinées Ensemble, Portant du Fruit pour Toujours' },
        items: {
          en: [
            '6:30 PM — Welcome Dinner & Reception',
            '7:15 PM — Gala Opening Remarks',
            '7:25 PM — Thanksgiving Worship Set',
            '7:50 PM — Special Number: "The Journey of the Seed" (Creative Worship Dance)',
            '8:05 PM — Testimonies: The Fruit I Carry Home',
            '8:30 PM — Collective Choreography: "Rooted Together" — 100 women unified movement',
            '8:50 PM — Thanksgiving Ceremony: Harvest Offering Moment',
            '9:10 PM — Final Blessing & Commissioning Prayer',
            '9:20 PM — Final Celebration Song',
            '9:30 PM — Close',
          ],
          fr: [
            '18h30 — Dîner de Bienvenue & Réception',
            '19h15 — Remarques d\'Ouverture du Gala',
            '19h25 — Louange de Thanksgiving',
            '19h50 — Numéro Spécial : "Le Voyage de la Graine" (Danse de Louange Créative)',
            '20h05 — Témoignages : Le Fruit que je Ramène à la Maison',
            '20h30 — Chorégraphie Collective : "Enracinées Ensemble" — 100 femmes en mouvement unifié',
            '20h50 — Cérémonie de Thanksgiving : Moment d\'Offrande de la Moisson',
            '21h10 — Bénédiction Finale & Prière de Commissionnement',
            '21h20 — Chant de Célébration Final',
            '21h30 — Clôture',
          ],
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
          fr: ['Louange', "Prière d'envoi", 'Bénédictions', 'Engagements', 'Moment de Témoignage Final : "Ce que je ramène à la maison"', 'Déclaration de la Conférence : Enracinées en Christ, Portant des Fruits Durables'],
        },
      },
    ],
  },
]

const dayColors = ['bg-[#40916C]', 'bg-[#2D6A4F]', 'bg-[#C9848A]', 'bg-[#C9A84C]', 'bg-[#1B3A5C]']
const dayIcons = ['🌱', '🌿', '🍃', '✨', '🕊️']

export default function SchedulePage() {
  const { t, lang } = useLanguage()
  const [activeDay, setActiveDay] = useState(1)

  const dayData = fullScheduleData.find((d) => d.day === activeDay)!

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
          {fullScheduleData.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeDay === d.day
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'bg-white text-[#1B3A5C] hover:bg-[#74C69D]/20 border border-[#74C69D]/30'
              }`}
            >
              <div className="font-bold">
                {lang === 'en' ? `Day ${d.day}` : `Jour ${d.day}`}
              </div>
              <div className={`text-xs mt-0.5 ${activeDay === d.day ? 'text-[#74C69D]' : 'text-gray-400'}`}>
                {lang === 'en'
                  ? d.date.en.split(', ')[1]
                  : d.date.fr.split(', ')[1]}
              </div>
            </button>
          ))}
        </div>

        {/* Active Day Card */}
        <div className={`${dayColors[activeDay - 1]} rounded-2xl px-6 py-4 mb-6 flex items-center gap-3 shadow-md`}>
          <span className="text-3xl">{dayIcons[activeDay - 1]}</span>
          <div>
            <p className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en'
                ? `Day ${activeDay} — ${dayData.date.en}`
                : `Jour ${activeDay} — ${dayData.date.fr}`}
            </p>
            <p className="text-white/80 text-sm italic">
              {lang === 'en' ? dayData.theme.en : dayData.theme.fr}
            </p>
          </div>
          {activeDay === 5 && (
            <span className="ml-auto text-xs bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full font-medium">
              {lang === 'en' ? 'Closes 12:00 PM' : 'Clôture à 12h00'}
            </span>
          )}
        </div>

        {/* Blocks Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#74C69D]/20 divide-y divide-[#74C69D]/10">
          {dayData.blocks.map((block, bi) => (
            <div key={bi} className="px-5 py-4 flex gap-4">
              {/* Time */}
              <div className="flex-shrink-0 w-32 sm:w-40 text-right pt-0.5">
                <span className="text-[#2D6A4F] font-bold text-xs leading-snug">{block.time}</span>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                {bi < dayData.blocks.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#74C69D]/20 mt-1 min-h-[20px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <p className="text-[#1B3A5C] font-semibold text-sm leading-snug">
                  {lang === 'en' ? block.title.en : block.title.fr}
                </p>
                {block.subtitle && (
                  <p className="text-[#40916C] text-xs italic mt-0.5">
                    {lang === 'en' ? block.subtitle.en : block.subtitle.fr}
                  </p>
                )}
                {block.items && (
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

        {/* Legend */}
        <div className="mt-8 p-4 bg-white rounded-2xl border border-[#74C69D]/20">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {lang === 'en' ? 'Session Types' : 'Types de Sessions'}
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {['🌱 Plenary', '🌿 Breakout / Workshop', '🙏 Worship', '📖 Devotion', '🍽️ Meal', '🕊️ Ceremony', '☀️ Free Time'].map((label) => (
              <span key={label} className="bg-[#FDF6EC] border border-[#74C69D]/20 px-3 py-1 rounded-full">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
