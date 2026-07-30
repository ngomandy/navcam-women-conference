'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/components/LanguageContext'

interface ScheduleBlock {
  time: string
  title: { en: string; fr: string }
  subtitle?: { en: string; fr: string }
  items?: { en: string[]; fr: string[] }
  cont?: boolean
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
      { time: '1:30 – 2:45 PM', title: { en: 'Arrival & Registration', fr: 'Arrivée et inscription' }, items: { en: ['Welcome desk & reception', 'Registration & check-in', 'Room allocation', 'Conference packs distribution', 'Refreshments', 'Fellowship & reconnection'], fr: ['Accueil et réception', 'Inscription & enregistrement', 'Attribution des chambres', 'Distribution des pochettes de la conférence', 'Rafraîchissements', 'Communion fraternelle & retrouvailles'] } },
      { time: '2:45 – 3:15 PM', title: { en: 'Registration continues', fr: 'Inscription (suite)' }, cont: true },
      { time: '3:15 – 3:30 PM', title: { en: 'Registration continues', fr: 'Inscription (suite)' }, cont: true },
      { time: '3:30 – 3:45 PM', title: { en: 'Registration continues', fr: 'Inscription (suite)' }, cont: true },
      { time: '4:00 – 5:30 PM', title: { en: 'Registration continues', fr: 'Inscription (suite)' }, cont: true },
      { time: '5:30 – 6:00 PM', title: { en: 'Registration continues', fr: 'Inscription (suite)' }, cont: true },
      { time: '6:00 – 7:00 PM', title: { en: 'Dinner', fr: 'Dîner' } },
      { time: '7:00 – 8:00 PM', title: { en: 'Opening Ceremony & Worship Night', fr: 'Cérémonie d\'ouverture et soirée de louange' }, subtitle: { en: 'Theme: Planted in Christ', fr: 'Thème : Plantées en Christ' }, items: { en: ['Opening prayer', 'Welcome procession', 'Word of Welcome by the Conference Director — official opening, presentation of theme, vision casting', 'Praise & worship', 'Keynote message', 'Testimony of the Day', 'Prayer of consecration'], fr: ['Prière d\'ouverture', 'Procession d\'accueil', 'Mot de bienvenue de la Directrice de la Conférence — ouverture officielle, présentation du thème, partage de la vision', 'Louange & adoration', 'Message principal', 'Témoignage du Jour', 'Prière de consécration'] } },
      { time: '8:00 – 9:00 PM', title: { en: 'Opening Ceremony continues', fr: 'La cérémonie d\'ouverture se poursuit' }, cont: true },
    ],
  },
  {
    day: 2,
    date: { en: 'Tuesday, August 11', fr: 'Mardi, 11 Août' },
    theme: { en: 'Roots That Heal & Deepen', fr: 'Des Racines qui Guérissent & s\'Approfondissent' },
    blocks: [
      { time: '5:30 – 6:00 AM', title: { en: 'Morning Sports & Wellness', fr: 'Sport et bien-être matinal' } },
      { time: '6:00 – 6:30 AM', title: { en: 'Morning Devotion (dorms/rooms)', fr: 'Méditation matinale (dortoirs/chambres)' } },
      { time: '6:30 – 7:00 AM', title: { en: 'Morning Preparation', fr: 'Préparation matinale' } },
      { time: '7:00 – 8:00 AM', title: { en: 'Breakfast', fr: 'Petit-déjeuner' } },
      { time: '8:00 – 8:30 AM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '8:30 – 9:00 AM', title: { en: 'God Focus Time', fr: 'Temps centré sur Dieu' } },
      { time: '9:00 – 10:15 AM', title: { en: 'Plenary 1 — "What Lies Beneath?"', fr: 'Plénière 1 — « Ce qui se cache en dessous »' } },
      { time: '10:15 – 10:45 AM', title: { en: 'Table Talk 1', fr: 'Échange de table 1' } },
      { time: '10:45 – 11:00 AM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '11:00 AM – 12:15 PM', title: { en: 'Panel 1 — Healing, Identity & Inner Wholeness', fr: 'Panel 1 — Guérison, identité et plénitude intérieure' } },
      { time: '12:15 – 1:15 PM', title: { en: 'Lunch', fr: 'Déjeuner' } },
      { time: '1:15 – 1:30 PM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '1:30 – 2:45 PM', title: { en: 'Plenary 2 — "The Life of the Vine"', fr: 'Plénière 2 — « La vie du cep »' } },
      { time: '2:45 – 3:15 PM', title: { en: 'Table Talk 2', fr: 'Échange de table 2' } },
      { time: '3:15 – 3:30 PM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '3:30 – 3:45 PM', title: { en: 'Testimony of the Day', fr: 'Témoignage du jour' } },
      { time: '4:00 – 5:30 PM', title: { en: 'Breakout Sessions — Round 1', fr: 'Ateliers — série 1' }, items: { en: ['Identity in Christ', 'Emotional Healing & Inner Restoration', 'Prayer & Intimacy With God', 'Women & Discipleship', 'Singleness, Waiting & Trusting God', 'Faith, Work & Everyday Calling'], fr: ['L\'Identité en Christ', 'Guérison Émotionnelle & Restauration Intérieure', 'Prière & Intimité avec Dieu', 'Femmes & Disciple-making', 'Célibat, Attente & Confiance en Dieu', 'Foi, Travail & Appel Quotidien'] } },
      { time: '5:30 – 6:00 PM', title: { en: 'Break / Free Time', fr: 'Pause / temps libre' } },
      { time: '6:00 – 7:00 PM', title: { en: 'Dinner', fr: 'Dîner' } },
      { time: '7:00 – 8:00 PM', title: { en: 'Free Time', fr: 'Temps libre' } },
      { time: '8:00 – 9:00 PM', title: { en: 'Evening Worship Hour', fr: 'Heure de louange du soir' } },
    ],
  },
  {
    day: 3,
    date: { en: 'Wednesday, August 12', fr: 'Mercredi, 12 Août' },
    theme: { en: 'Bearing Lasting Fruit', fr: 'Porter du Fruit qui Demeure' },
    blocks: [
      { time: '5:30 – 6:00 AM', title: { en: 'Morning Sports & Wellness', fr: 'Sport et bien-être matinal' } },
      { time: '6:00 – 6:30 AM', title: { en: 'Morning Devotion (dorms/rooms)', fr: 'Méditation matinale (dortoirs/chambres)' } },
      { time: '6:30 – 7:00 AM', title: { en: 'Morning Preparation', fr: 'Préparation matinale' } },
      { time: '7:00 – 8:00 AM', title: { en: 'Breakfast', fr: 'Petit-déjeuner' } },
      { time: '8:00 – 8:30 AM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '8:30 – 9:00 AM', title: { en: 'God Focus Time', fr: 'Temps centré sur Dieu' } },
      { time: '9:00 – 10:15 AM', title: { en: 'Plenary 3 — "What Does Lasting Fruit Look Like?"', fr: 'Plénière 3 — « À quoi ressemble du fruit qui demeure ? »' } },
      { time: '10:15 – 10:45 AM', title: { en: 'Table Talk 3', fr: 'Échange de table 3' } },
      { time: '10:45 – 11:00 AM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '11:00 AM – 12:15 PM', title: { en: 'Plenary 4 — "Fruit Grows in Community"', fr: 'Plénière 4 — « Le fruit grandit en communauté »' } },
      { time: '12:15 – 1:15 PM', title: { en: 'Lunch', fr: 'Déjeuner' } },
      { time: '1:15 – 1:30 PM', title: { en: 'Prep & Departure for the Excursion', fr: 'Préparatifs et départ pour l\'excursion' } },
      { time: '1:30 – 2:45 PM', title: { en: 'Ladies\' Excursion begins (incl. Table Talk 4 & Panel 2)', fr: 'Début de l\'excursion des femmes (incl. échange de table 4 et Panel 2)' }, subtitle: { en: 'Table Talk 4 & Panel 2 — Women, Calling & Influence', fr: 'Échange de Table 4 & Panel 2 — Femmes, Appel & Influence' } },
      { time: '2:45 – 3:15 PM', title: { en: 'Ladies\' Excursion continues', fr: 'L\'excursion des femmes se poursuit' }, cont: true },
      { time: '3:15 – 3:30 PM', title: { en: 'Ladies\' Excursion continues', fr: 'L\'excursion des femmes se poursuit' }, cont: true },
      { time: '3:30 – 3:45 PM', title: { en: 'Ladies\' Excursion continues', fr: 'L\'excursion des femmes se poursuit' }, cont: true },
      { time: '4:00 – 5:30 PM', title: { en: 'Ladies\' Excursion continues', fr: 'L\'excursion des femmes se poursuit' }, cont: true },
      { time: '5:30 – 6:00 PM', title: { en: 'Ladies\' Excursion returns by 6:00 PM', fr: 'Retour de l\'excursion des femmes avant 18 h' } },
      { time: '6:00 – 7:00 PM', title: { en: 'Dinner', fr: 'Dîner' } },
      { time: '7:00 – 8:00 PM', title: { en: 'Free Time', fr: 'Temps libre' } },
      { time: '8:00 – 9:00 PM', title: { en: 'Evening Worship Hour', fr: 'Heure de louange du soir' } },
    ],
  },
  {
    day: 4,
    date: { en: 'Thursday, August 13', fr: 'Jeudi, 13 Août' },
    theme: { en: 'Sent to Bear Fruit', fr: 'Envoyées pour Porter du Fruit' },
    blocks: [
      { time: '5:30 – 6:00 AM', title: { en: 'Morning Sports & Wellness', fr: 'Sport et bien-être matinal' } },
      { time: '6:00 – 6:30 AM', title: { en: 'Morning Devotion (dorms/rooms)', fr: 'Méditation matinale (dortoirs/chambres)' } },
      { time: '6:30 – 7:00 AM', title: { en: 'Morning Preparation', fr: 'Préparation matinale' } },
      { time: '7:00 – 8:00 AM', title: { en: 'Breakfast', fr: 'Petit-déjeuner' } },
      { time: '8:00 – 8:30 AM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '8:30 – 9:00 AM', title: { en: 'God Focus Time', fr: 'Temps centré sur Dieu' } },
      { time: '9:00 – 10:15 AM', title: { en: 'Plenary 5 — "Counting the Cost of Being Sent"', fr: 'Plénière 5 — « Compter le prix d\'être envoyée »' } },
      { time: '10:15 – 10:45 AM', title: { en: 'Table Talk 5', fr: 'Échange de table 5' } },
      { time: '10:45 – 11:00 AM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '11:00 AM – 12:15 PM', title: { en: 'Panel 3 — Bearing Fruit Beyond the Conference', fr: 'Panel 3 — Porter du fruit au-delà de la conférence' } },
      { time: '12:15 – 1:15 PM', title: { en: 'Lunch', fr: 'Déjeuner' } },
      { time: '1:15 – 1:30 PM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '1:30 – 2:45 PM', title: { en: 'Plenary 6 — "From Rooted to Sent"', fr: 'Plénière 6 — « D\'enracinée à envoyée »' } },
      { time: '2:45 – 3:15 PM', title: { en: 'Table Talk 6', fr: 'Échange de table 6' } },
      { time: '3:15 – 3:30 PM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '3:30 – 3:45 PM', title: { en: 'Testimony of the Day', fr: 'Témoignage du jour' } },
      { time: '4:00 – 5:30 PM', title: { en: 'Breakout Sessions — Round 2', fr: 'Ateliers — série 2' }, items: { en: ['Marriage & Family as Discipleship', 'Leadership & Influence', 'Purpose & Calling', 'Faithful Stewardship', 'Mentorship Across Generations', 'Missions & Disciple-Making'], fr: ['Le Mariage & la Famille comme Discipulat', 'Leadership & Influence', 'Sens de la Vie & Appel', 'Une Intendance Fidèle', 'Le Mentorat Intergénérationnel', 'Missions & Formation de Disciples'] } },
      { time: '5:30 – 6:00 PM', title: { en: 'Break / Free Time', fr: 'Pause / temps libre' } },
      { time: '6:00 – 7:00 PM', title: { en: 'Closing Gala Night begins — The Harvest Table', fr: 'Début de la soirée de gala — La table de la moisson' }, subtitle: { en: 'Thanksgiving & Celebration: Rooted Together, Bearing Fruit Forever', fr: 'Action de Grâce & Célébration : Enracinées Ensemble, Portant du Fruit pour Toujours' }, items: { en: ['6:00 PM — Welcome Dinner & Reception', '6:45 PM — Gala Opening Remarks', '6:55 PM — Thanksgiving Worship Set', '7:20 PM — Special Number: "The Journey of the Seed" (Creative Worship Dance)', '7:35 PM — Testimonies: The Fruit I Carry Home', '8:00 PM — Collective Choreography: "Rooted Together"', '8:20 PM — Thanksgiving Ceremony: Harvest Offering Moment', '8:40 PM — Final Blessing & Commissioning Prayer', '8:50 PM — Final Celebration Song', '9:00 PM — Close'], fr: ['18h00 — Dîner d\'Accueil & Réception', '18h45 — Mot d\'Ouverture du Gala', '18h55 — Temps de Louange d\'Action de Grâce', '19h20 — Numéro Spécial : « Le Voyage de la Graine » (Danse de Louange Créative)', '19h35 — Témoignages : Le Fruit que j\'Emporte avec Moi', '20h00 — Chorégraphie Collective : « Enracinées Ensemble »', '20h20 — Cérémonie d\'Action de Grâce : Moment de l\'Offrande de la Moisson', '20h40 — Bénédiction Finale & Prière d\'Envoi', '20h50 — Chant Final de Célébration', '21h00 — Clôture'] } },
      { time: '7:00 – 8:00 PM', title: { en: 'Gala continues', fr: 'Le gala se poursuit' }, cont: true },
      { time: '8:00 – 9:00 PM', title: { en: 'Gala continues', fr: 'Le gala se poursuit' }, cont: true },
    ],
  },
  {
    day: 5,
    date: { en: 'Friday, August 14', fr: 'Vendredi, 14 Août' },
    theme: { en: 'Commissioned to Bear Lasting Fruit', fr: 'Envoyées pour Porter du Fruit qui Demeure' },
    blocks: [
      { time: '7:00 – 8:00 AM', title: { en: 'Breakfast', fr: 'Petit-déjeuner' } },
      { time: '8:00 – 8:30 AM', title: { en: 'Praise & Worship', fr: 'Louange et adoration' } },
      { time: '8:30 – 9:00 AM', title: { en: 'God Focus Time', fr: 'Temps centré sur Dieu' } },
      { time: '9:00 – 10:15 AM', title: { en: '"Going Forward Together"', fr: '« Avancer ensemble »' }, subtitle: { en: 'Commissioning teaching · Acts 1:8', fr: 'Enseignement d\'envoi · Actes 1:8' }, items: { en: ['Teaching Segment 1 — Chosen for a Purpose (John 15:16)', 'Teaching Segment 2 — Sent Into the World (Acts 1:8)', 'A Covenant of Obedience', 'Final Testimony Moment — "What I Am Taking Home"'], fr: ['Segment d\'Enseignement 1 — Choisies pour un Dessein (Jean 15:16)', 'Segment d\'Enseignement 2 — Envoyées dans le Monde (Actes 1:8)', 'Une Alliance d\'Obéissance', 'Moment de Témoignage Final — « Ce que j\'emporte avec moi »'] } },
      { time: '10:15 – 10:45 AM', title: { en: 'Evaluation & Feedback, Q&A, Announcements & Closing', fr: 'Évaluation, questions, annonces et clôture' } },
      { time: '10:45 – 11:00 AM', title: { en: 'Closing block continues', fr: 'Le bloc de clôture se poursuit' }, cont: true },
      { time: '11:00 AM – 12:15 PM', title: { en: 'Closing block continues', fr: 'Le bloc de clôture se poursuit' }, cont: true },
    ],
  },
]

const dayColors = ['bg-[#40916C]', 'bg-[#2D6A4F]', 'bg-[#C9848A]', 'bg-[#C9A84C]', 'bg-[#1B3A5C]']
const dayIcons = ['🌱', '🌿', '🍃', '✨', '🕊️']

/* ── Session types: colour + icon + emphasis tier ─────────────────────── */
type SessionType =
  | 'ceremony' | 'plenary' | 'breakout' | 'worship' | 'talk'
  | 'devotion' | 'excursion' | 'sports' | 'meal' | 'arrival' | 'free' | 'admin'
type Tier = 'marquee' | 'feature' | 'normal' | 'muted'

const TYPES: Record<SessionType, { icon: string; color: string; tier: Tier; label: { en: string; fr: string } }> = {
  ceremony:  { icon: '🕊️', color: '#C9A84C', tier: 'marquee', label: { en: 'Ceremony',   fr: 'Cérémonie' } },
  plenary:   { icon: '🌱', color: '#2D6A4F', tier: 'feature', label: { en: 'Plenary',    fr: 'Plénière' } },
  breakout:  { icon: '🌿', color: '#40916C', tier: 'feature', label: { en: 'Breakout',   fr: 'Atelier' } },
  excursion: { icon: '🚌', color: '#40916C', tier: 'feature', label: { en: 'Excursion',  fr: 'Excursion' } },
  worship:   { icon: '🙏', color: '#C9848A', tier: 'normal',  label: { en: 'Worship',    fr: 'Louange' } },
  talk:      { icon: '💬', color: '#74C69D', tier: 'normal',  label: { en: 'Table Talk', fr: 'Échange' } },
  devotion:  { icon: '📖', color: '#1B3A5C', tier: 'normal',  label: { en: 'Devotion',   fr: 'Méditation' } },
  arrival:   { icon: '🧳', color: '#40916C', tier: 'normal',  label: { en: 'Arrival',    fr: 'Arrivée' } },
  sports:    { icon: '🏃‍♀️', color: '#74C69D', tier: 'muted', label: { en: 'Wellness',  fr: 'Bien-être' } },
  meal:      { icon: '🍽️', color: '#C9A84C', tier: 'muted',   label: { en: 'Meal',       fr: 'Repas' } },
  free:      { icon: '☀️', color: '#9CA3AF', tier: 'muted',   label: { en: 'Free Time',  fr: 'Temps Libre' } },
  admin:     { icon: '📝', color: '#9CA3AF', tier: 'muted',   label: { en: 'Session',    fr: 'Session' } },
}

function inferType(titleEn: string): SessionType {
  const t = titleEn
  if (/Opening Ceremony|Gala|Commission|Ceremony|Going Forward|Covenant/i.test(t)) return 'ceremony'
  if (/Plenary|Panel/i.test(t)) return 'plenary'
  if (/Breakout/i.test(t)) return 'breakout'
  if (/Excursion/i.test(t)) return 'excursion'
  if (/Table Talk|Testimony/i.test(t)) return 'talk'
  if (/Worship|Praise|God Focus/i.test(t)) return 'worship'
  if (/Devotion/i.test(t)) return 'devotion'
  if (/Breakfast|Lunch|Dinner/i.test(t)) return 'meal'
  if (/Sports|Wellness/i.test(t)) return 'sports'
  if (/Arrival|Registration/i.test(t)) return 'arrival'
  if (/Free Time|Break|Preparation|Prep/i.test(t)) return 'free'
  return 'admin'
}

/* Parse "1:30 PM – 6:00 PM" / "5:30 – 6:00 AM" → 24h start & end. */
function parseTimes(str: string): { start: { h: number; m: number }; end: { h: number; m: number } } | null {
  const toks = [...str.matchAll(/(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/gi)]
  if (!toks.length) return null
  const first = toks[0]
  const last = toks[toks.length - 1]
  let startMer = first[3]?.toUpperCase()
  let endMer = last[3]?.toUpperCase()
  if (!endMer) endMer = startMer
  if (!startMer) startMer = endMer
  const to24 = (hh: number, mer?: string) => {
    let h = hh
    if (mer === 'PM' && h !== 12) h += 12
    if (mer === 'AM' && h === 12) h = 0
    return h
  }
  return {
    start: { h: to24(+first[1], startMer), m: +first[2] },
    end: { h: to24(+last[1], endMer), m: +last[2] },
  }
}

function startMinutes(str: string): number {
  const p = parseTimes(str)
  return p ? p.start.h * 60 + p.start.m : 0
}

const timeGroups = [
  { key: 'morning',   icon: '☀️', from: 0,    to: 720,  label: { en: 'Morning',   fr: 'Matin' } },
  { key: 'afternoon', icon: '🌤️', from: 720,  to: 1080, label: { en: 'Afternoon', fr: 'Après-midi' } },
  { key: 'evening',   icon: '🌙', from: 1080, to: 2400, label: { en: 'Evening',   fr: 'Soir' } },
]

/* Build a downloadable .ics for the whole conference. */
function icsEscape(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}
function pad2(n: number) { return String(n).padStart(2, '0') }
function buildICS(lang: 'en' | 'fr') {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//NavCam Women 2026//Schedule//EN', 'CALSCALE:GREGORIAN']
  fullScheduleData.forEach((day) => {
    const dom = 9 + day.day // Day 1 → Aug 10
    day.blocks.forEach((block, bi) => {
      const tr = parseTimes(block.time)
      if (!tr) return
      const dt = (h: number, m: number) => `202608${pad2(dom)}T${pad2(h)}${pad2(m)}00`
      const descParts: string[] = []
      if (block.subtitle) descParts.push(block.subtitle[lang])
      if (block.items) descParts.push(block.items[lang].join(' • '))
      lines.push(
        'BEGIN:VEVENT',
        `UID:navcam2026-d${day.day}-b${bi}@navcamwomen`,
        'DTSTAMP:20260101T000000Z',
        `DTSTART:${dt(tr.start.h, tr.start.m)}`,
        `DTEND:${dt(tr.end.h, tr.end.m)}`,
        `SUMMARY:${icsEscape(block.title[lang])}`,
        ...(descParts.length ? [`DESCRIPTION:${icsEscape(descParts.join(' — '))}`] : []),
        'LOCATION:Care & Hope Center, Yaoundé, Cameroon',
        'END:VEVENT',
      )
    })
  })
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

interface LiveInfo { day: number; nowIndex: number; nextIndex: number }
function computeLive(): LiveInfo | null {
  const now = new Date()
  for (const day of fullScheduleData) {
    const dom = 9 + day.day
    if (now.getFullYear() !== 2026 || now.getMonth() !== 7 || now.getDate() !== dom) continue
    let nowIndex = -1
    let nextIndex = -1
    day.blocks.forEach((block, bi) => {
      const tr = parseTimes(block.time)
      if (!tr) return
      const start = new Date(2026, 7, dom, tr.start.h, tr.start.m)
      const end = new Date(2026, 7, dom, tr.end.h, tr.end.m)
      if (now >= start && now < end) nowIndex = bi
      if (nextIndex === -1 && now < start) nextIndex = bi
    })
    return { day: day.day, nowIndex, nextIndex }
  }
  return null
}

function TimelineBlock({ block, lang, bi, total, live }: {
  block: ScheduleBlock
  lang: 'en' | 'fr'
  bi: number
  total: number
  live: 'now' | 'next' | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const cont = !!block.cont
  const type = TYPES[inferType(block.title.en)]
  const tier: Tier = cont ? 'muted' : type.tier
  const isBig = !cont && (tier === 'marquee' || tier === 'feature')
  const isMuted = cont || tier === 'muted'

  return (
    <div
      ref={ref}
      className={`px-4 sm:px-5 ${cont ? 'py-1.5' : 'py-3.5'} flex gap-3 sm:gap-4 timeline-block${visible ? ' visible' : ''}${isMuted ? ' opacity-80' : ''}`}
      style={{
        transitionDelay: `${bi * 40}ms`,
        ...(!cont && tier === 'marquee'
          ? { background: `${type.color}12`, borderLeft: `3px solid ${type.color}` }
          : live === 'now'
            ? { background: '#2D6A4F0D', borderLeft: '3px solid #2D6A4F' }
            : {}),
      }}
    >
      <div className="flex-shrink-0 w-24 sm:w-32 text-right pt-0.5">
        <span className={`font-bold text-xs leading-snug ${isMuted ? 'text-gray-400' : 'text-[#2D6A4F]'}`}>
          {block.time}
        </span>
      </div>

      {/* Node: icon-in-ring for feature/marquee, dot otherwise */}
      <div className="flex flex-col items-center pt-0.5 flex-shrink-0">
        {isBig ? (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] leading-none flex-shrink-0"
            style={{ background: `${type.color}22`, border: `1.5px solid ${type.color}` }}
          >
            {type.icon}
          </div>
        ) : (
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
            style={{ background: isMuted ? '#CBD5E1' : type.color }}
          />
        )}
        {bi < total - 1 && <div className="w-0.5 flex-1 bg-[#74C69D]/20 mt-1 min-h-[18px]" />}
      </div>

      <div className="flex-1 pb-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {cont
            ? <span className="text-gray-300 text-xs leading-none">⤷</span>
            : !isBig && <span className="text-xs leading-none">{type.icon}</span>}
          <p className={`leading-snug ${
            cont ? 'text-gray-400 font-normal italic text-xs'
              : tier === 'marquee' ? 'text-[#1B3A5C] font-bold text-base'
                : isMuted ? 'text-gray-500 font-medium text-sm'
                  : 'text-[#1B3A5C] font-semibold text-sm'
          }`}>
            {lang === 'en' ? block.title.en : block.title.fr}
          </p>
          {live === 'now' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-white bg-[#2D6A4F] px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {lang === 'en' ? 'Now' : 'En cours'}
            </span>
          )}
          {live === 'next' && (
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#B8963A] bg-[#C9A84C]/15 border border-[#C9A84C]/40 px-2 py-0.5 rounded-full">
              {lang === 'en' ? 'Up next' : 'À suivre'}
            </span>
          )}
        </div>
        {block.subtitle && (
          <p className="text-[#40916C] text-xs italic mt-0.5">
            {lang === 'en' ? block.subtitle.en : block.subtitle.fr}
          </p>
        )}
        {block.items && (
          <ul className={`mt-2 gap-x-6 gap-y-1 ${block.items[lang].length > 6 ? 'sm:grid sm:grid-cols-2 space-y-1 sm:space-y-0' : 'space-y-1'}`}>
            {block.items[lang].map((item, ii) => (
              <li key={ii} className="text-gray-500 text-xs flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0" style={{ color: type.color }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const legendTypes: SessionType[] = ['ceremony', 'plenary', 'breakout', 'worship', 'talk', 'devotion', 'meal', 'free']

export default function SchedulePage() {
  const { t, lang } = useLanguage()
  const [activeDay, setActiveDay] = useState(1)
  const [tabKey, setTabKey] = useState(0)
  const [live, setLive] = useState<LiveInfo | null>(null)

  // On mount (and every minute), refresh the "happening now" state and, during
  // the conference, jump to today's tab.
  useEffect(() => {
    const update = () => {
      const info = computeLive()
      setLive(info)
      if (info) setActiveDay(info.day)
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  const handleDayChange = (day: number) => {
    setActiveDay(day)
    setTabKey(k => k + 1)
  }

  const downloadIcs = () => {
    const blob = new Blob([buildICS(lang)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'navcam-women-2026-schedule.ics'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const dayData = fullScheduleData.find((d) => d.day === activeDay)!
  const liveForDay = live && live.day === activeDay ? live : null

  // Split the day's blocks into Morning / Afternoon / Evening (skip empties).
  const grouped = timeGroups
    .map((g) => ({
      ...g,
      blocks: dayData.blocks
        .map((block, idx) => ({ block, idx }))
        .filter(({ block }) => {
          const m = startMinutes(block.time)
          return m >= g.from && m < g.to
        }),
    }))
    .filter((g) => g.blocks.length > 0)

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
          <div className="no-print mt-4 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={downloadIcs}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A84C] hover:bg-[#B8963A] text-white text-sm font-semibold rounded-full transition-all shadow-sm"
            >
              📅 {lang === 'en' ? 'Add to calendar' : 'Ajouter au calendrier'}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full border border-white/20 transition-all"
            >
              🖨️ {lang === 'en' ? 'Print Schedule' : 'Imprimer le Programme'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Day Tabs — sticky under the navbar */}
        <div className="no-print sticky top-16 md:top-20 z-30 bg-[#FDF6EC]/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-6 border-b border-[#74C69D]/15">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {fullScheduleData.map((d) => {
              const isLiveDay = live && live.day === d.day
              return (
                <button
                  key={d.day}
                  onClick={() => handleDayChange(d.day)}
                  className={`relative flex-shrink-0 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeDay === d.day
                      ? 'bg-[#2D6A4F] text-white shadow-md'
                      : 'bg-white text-[#1B3A5C] hover:bg-[#74C69D]/20 border border-[#74C69D]/30'
                  }`}
                >
                  {isLiveDay && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C9A84C] ring-2 ring-[#FDF6EC] animate-pulse" />
                  )}
                  <div className="font-bold flex items-center gap-1.5">
                    <span>{dayIcons[d.day - 1]}</span>
                    {lang === 'en' ? `Day ${d.day}` : `Jour ${d.day}`}
                  </div>
                  <div className={`text-xs mt-0.5 ${activeDay === d.day ? 'text-[#74C69D]' : 'text-gray-400'}`}>
                    {lang === 'en' ? d.date.en.split(', ')[1] : d.date.fr.split(', ')[1]}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Day Card + Animated Blocks */}
        <div key={tabKey} className="animate-tab-enter">
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
                {lang === 'en' ? 'Closes 12:15 PM' : 'Clôture à 12h15'}
              </span>
            )}
          </div>

          {/* Grouped, animated timeline blocks */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#74C69D]/20 divide-y divide-[#74C69D]/10 overflow-hidden">
            {grouped.map((g) => (
              <div key={g.key}>
                <div className="px-5 pt-4 pb-1 flex items-center gap-2 bg-[#FDF6EC]/40">
                  <span className="text-sm">{g.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">
                    {lang === 'en' ? g.label.en : g.label.fr}
                  </span>
                </div>
                {g.blocks.map(({ block, idx }, j) => (
                  <TimelineBlock
                    key={idx}
                    block={block}
                    lang={lang}
                    bi={j}
                    total={g.blocks.length}
                    live={liveForDay
                      ? (liveForDay.nowIndex === idx ? 'now' : liveForDay.nextIndex === idx ? 'next' : null)
                      : null}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend — colours match the timeline */}
        <div className="no-print mt-8 p-4 bg-white rounded-2xl border border-[#74C69D]/20">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {lang === 'en' ? 'Session Types' : 'Types de Sessions'}
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            {legendTypes.map((key) => {
              const ty = TYPES[key]
              return (
                <span key={key} className="inline-flex items-center gap-1.5 bg-[#FDF6EC] border border-[#74C69D]/20 px-3 py-1 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: ty.color }} />
                  {ty.icon} {lang === 'en' ? ty.label.en : ty.label.fr}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── PRINT-ONLY: all 5 days ────────────────────────────────────────── */}
      <div className="print-only hidden px-8 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            {lang === 'en' ? "2026 Navigators of Cameroon National Women's Conference" : 'Conférence Nationale des Femmes Navigateurs du Cameroun 2026'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{t.conference.dates} · {t.conference.venue}</p>
        </div>
        {fullScheduleData.map((day) => (
          <div key={day.day} className="print-day">
            <h2>
              {lang === 'en'
                ? `Day ${day.day} — ${day.date.en} · ${day.theme.en}`
                : `Jour ${day.day} — ${day.date.fr} · ${day.theme.fr}`}
            </h2>
            {day.blocks.map((block, bi) => (
              <div key={bi} className="print-block">
                <span className="print-time">{block.time}</span>
                <div>
                  <span className="print-title">
                    {lang === 'en' ? block.title.en : block.title.fr}
                  </span>
                  {block.items && (
                    <span className="text-gray-500 text-xs">
                      {' '}— {block.items[lang].join(' · ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
