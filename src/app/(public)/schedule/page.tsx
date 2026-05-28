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

export default function SchedulePage() {
  const { t, lang } = useLanguage()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState(1)

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
                  {/* Time */}
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-[#2D6A4F] font-bold text-sm">{session.startTime}</div>
                    <div className="text-gray-400 text-xs">–</div>
                    <div className="text-gray-500 text-xs">{session.endTime}</div>
                  </div>

                  {/* Divider */}
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] mt-1 flex-shrink-0" />
                    <div className="w-0.5 flex-1 bg-[#74C69D]/30 mt-1" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="text-[#1B3A5C] font-semibold text-sm leading-snug">
                        {lang === 'en' ? session.titleEn : session.titleFr}
                      </h3>
                      <span
                        className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${getSessionTypeColor(session.type)}`}
                      >
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
              <span
                key={key}
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSessionTypeColor(key)}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
