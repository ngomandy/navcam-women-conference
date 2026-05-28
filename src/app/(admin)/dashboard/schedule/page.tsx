'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
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

const SESSION_TYPES = ['PLENARY', 'BREAKOUT', 'WORSHIP', 'DEVOTION', 'MEAL', 'FREE', 'CEREMONY']
const DAYS = [1, 2, 3, 4, 5]

const emptySession: Omit<Session, 'id'> = {
  dayNumber: 1,
  date: '2026-08-10',
  startTime: '09:00',
  endTime: '10:00',
  titleEn: '',
  titleFr: '',
  descriptionEn: '',
  descriptionFr: '',
  type: 'PLENARY',
  speakerNames: '',
  location: '',
  order: 0,
}

const DAY_DATES: Record<number, string> = {
  1: '2026-08-10',
  2: '2026-08-11',
  3: '2026-08-12',
  4: '2026-08-13',
  5: '2026-08-14',
}

export default function AdminSchedulePage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [form, setForm] = useState<Omit<Session, 'id'>>(emptySession)
  const [saving, setSaving] = useState(false)

  const fetchSessions = async () => {
    const res = await fetch('/api/sessions')
    const data = await res.json()
    setSessions(data.sessions || [])
    setLoading(false)
  }

  useEffect(() => { fetchSessions() }, [])

  const sessionsByDay = DAYS.reduce<Record<number, Session[]>>((acc, day) => {
    acc[day] = sessions.filter((s) => s.dayNumber === day).sort((a, b) => a.order - b.order)
    return acc
  }, {} as Record<number, Session[]>)

  const openAdd = () => {
    setEditingSession(null)
    setForm({ ...emptySession, dayNumber: activeDay, date: DAY_DATES[activeDay], order: (sessionsByDay[activeDay]?.length || 0) + 1 })
    setShowModal(true)
  }

  const openEdit = (s: Session) => {
    setEditingSession(s)
    setForm({ ...s })
    setShowModal(true)
  }

  const save = async () => {
    setSaving(true)
    try {
      if (editingSession) {
        await fetch(`/api/sessions/${editingSession.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setShowModal(false)
      fetchSessions()
    } finally {
      setSaving(false)
    }
  }

  const deleteSession = async (id: string) => {
    if (!confirm('Delete this session?')) return
    await fetch(`/api/sessions/${id}`, { method: 'DELETE' })
    fetchSessions()
  }

  const moveSession = async (session: Session, dir: 'up' | 'down') => {
    const daySessions = sessionsByDay[session.dayNumber]
    const idx = daySessions.findIndex((s) => s.id === session.id)
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= daySessions.length) return

    const other = daySessions[swapIdx]
    await Promise.all([
      fetch(`/api/sessions/${session.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: other.order }),
      }),
      fetch(`/api/sessions/${other.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: session.order }),
      }),
    ])
    fetchSessions()
  }

  const dayThemes = [
    'Arrival & Welcome',
    'Roots That Heal',
    'Bearing Fruits',
    'Sent to Bear Fruit',
    'Commissioned',
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Schedule Management / Gestion du Programme
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] transition-colors"
        >
          <Plus size={15} />
          Add Session
        </button>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeDay === day
                ? 'bg-[#2D6A4F] text-white shadow-sm'
                : 'bg-white text-[#1B3A5C] border border-[#74C69D]/30 hover:bg-[#74C69D]/10'
            }`}
          >
            Day {day}
            <span className="block text-xs opacity-70">{dayThemes[day - 1]}</span>
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Loading...</div>
        ) : (sessionsByDay[activeDay] || []).length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100">
            No sessions for Day {activeDay}. Click &ldquo;Add Session&rdquo; to get started.
          </div>
        ) : (
          (sessionsByDay[activeDay] || []).map((session, i, arr) => (
            <div
              key={session.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
            >
              {/* Order controls */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveSession(session, 'up')}
                  disabled={i === 0}
                  className="p-1 text-gray-300 hover:text-[#2D6A4F] disabled:opacity-20 rounded hover:bg-[#2D6A4F]/10 transition-colors"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => moveSession(session, 'down')}
                  disabled={i === arr.length - 1}
                  className="p-1 text-gray-300 hover:text-[#2D6A4F] disabled:opacity-20 rounded hover:bg-[#2D6A4F]/10 transition-colors"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Time */}
              <div className="w-20 flex-shrink-0 text-right">
                <p className="text-[#2D6A4F] font-bold text-xs">{session.startTime}</p>
                <p className="text-gray-400 text-xs">–{session.endTime}</p>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSessionTypeColor(session.type)}`}>
                    {session.type}
                  </span>
                  <h3 className="text-sm font-medium text-[#1B3A5C]">{session.titleEn}</h3>
                </div>
                {session.titleFr !== session.titleEn && (
                  <p className="text-xs text-gray-400 mt-0.5 italic">{session.titleFr}</p>
                )}
                {session.speakerNames && (
                  <p className="text-xs text-[#C9848A] mt-0.5">🎤 {session.speakerNames}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEdit(session)}
                  className="p-2 text-[#1B3A5C] hover:bg-[#2D6A4F]/10 rounded-lg transition-colors"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => deleteSession(session.id)}
                  className="p-2 text-[#C9848A] hover:bg-[#C9848A]/10 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1B3A5C] text-white p-5 rounded-t-3xl">
              <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editingSession ? 'Edit Session' : 'Add Session'}
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Day</label>
                  <select
                    value={form.dayNumber}
                    onChange={(e) => setForm((f) => ({ ...f, dayNumber: Number(e.target.value), date: DAY_DATES[Number(e.target.value)] }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    {DAYS.map((d) => <option key={d} value={d}>Day {d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    {SESSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Start Time</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">End Time</label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Title (English)</label>
                <input
                  type="text"
                  value={form.titleEn}
                  onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Session title in English"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Title (French / Titre)</label>
                <input
                  type="text"
                  value={form.titleFr}
                  onChange={(e) => setForm((f) => ({ ...f, titleFr: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Titre en français"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Speaker(s)</label>
                <input
                  type="text"
                  value={form.speakerNames || ''}
                  onChange={(e) => setForm((f) => ({ ...f, speakerNames: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Speaker names (optional)"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Location</label>
                <input
                  type="text"
                  value={form.location || ''}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Room / location (optional)"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving || !form.titleEn}
                  className="flex-1 py-2.5 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] disabled:opacity-60 transition-colors"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
