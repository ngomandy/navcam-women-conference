'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Mic } from 'lucide-react'

interface Speaker {
  id: string
  name: string
  titleEn?: string
  titleFr?: string
  bio?: string
  photoUrl?: string
  createdAt: string
}

const emptySpeaker: Omit<Speaker, 'id' | 'createdAt'> = {
  name: '',
  titleEn: '',
  titleFr: '',
  bio: '',
  photoUrl: '',
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null)
  const [form, setForm] = useState<Omit<Speaker, 'id' | 'createdAt'>>(emptySpeaker)
  const [saving, setSaving] = useState(false)

  const fetchSpeakers = async () => {
    const res = await fetch('/api/speakers')
    if (res.ok) {
      const data = await res.json()
      setSpeakers(data.speakers || [])
    }
    setLoading(false)
  }

  useEffect(() => { fetchSpeakers() }, [])

  const openAdd = () => {
    setEditingSpeaker(null)
    setForm({ ...emptySpeaker })
    setShowModal(true)
  }

  const openEdit = (s: Speaker) => {
    setEditingSpeaker(s)
    setForm({ name: s.name, titleEn: s.titleEn || '', titleFr: s.titleFr || '', bio: s.bio || '', photoUrl: s.photoUrl || '' })
    setShowModal(true)
  }

  const save = async () => {
    if (!form.name) return
    setSaving(true)
    try {
      if (editingSpeaker) {
        await fetch(`/api/speakers/${editingSpeaker.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        await fetch('/api/speakers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setShowModal(false)
      fetchSpeakers()
    } finally {
      setSaving(false)
    }
  }

  const deleteSpeaker = async (id: string) => {
    if (!confirm('Delete this speaker?')) return
    await fetch(`/api/speakers/${id}`, { method: 'DELETE' })
    fetchSpeakers()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Speakers / Orateurs
          </h1>
          <p className="text-gray-400 text-sm">{speakers.length} speaker{speakers.length !== 1 ? 's' : ''} registered</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] transition-colors"
        >
          <Plus size={15} />
          Add Speaker
        </button>
      </div>

      {/* TBD Banner */}
      <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-2xl p-5 flex items-start gap-3">
        <div className="text-2xl">📢</div>
        <div>
          <p className="font-semibold text-[#1B3A5C] text-sm">Speakers To Be Announced / Orateurs à Confirmer</p>
          <p className="text-gray-600 text-sm mt-1">
            Conference speakers are being confirmed. Check back soon for updates on our amazing lineup of women leaders and teachers.
          </p>
          <p className="text-gray-500 text-xs mt-1 italic">
            Les orateurs de la conférence sont en cours de confirmation. Revenez bientôt pour des mises à jour sur notre incroyable programme.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400 text-sm">Loading...</div>
      ) : speakers.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
          <Mic size={48} className="mx-auto mb-4 text-gray-200" />
          <p className="text-gray-500 font-medium mb-1">No speakers added yet</p>
          <p className="text-gray-400 text-sm">Speakers will be announced as the conference approaches</p>
          <button
            onClick={openAdd}
            className="mt-4 px-5 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] transition-colors"
          >
            Add First Speaker
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2D6A4F] to-[#C9848A] rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                  {speaker.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(speaker)}
                    className="p-1.5 text-[#1B3A5C] hover:bg-[#2D6A4F]/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => deleteSpeaker(speaker.id)}
                    className="p-1.5 text-[#C9848A] hover:bg-[#C9848A]/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-[#1B3A5C] text-base">{speaker.name}</h3>
              {speaker.titleEn && (
                <p className="text-[#40916C] text-xs mt-0.5">{speaker.titleEn}</p>
              )}
              {speaker.titleFr && speaker.titleFr !== speaker.titleEn && (
                <p className="text-gray-400 text-xs italic">{speaker.titleFr}</p>
              )}
              {speaker.bio && (
                <p className="text-gray-500 text-xs mt-2 line-clamp-3 leading-relaxed">{speaker.bio}</p>
              )}
              <p className="text-gray-300 text-xs mt-2">
                Added {new Date(speaker.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1B3A5C] text-white p-5 rounded-t-3xl">
              <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editingSpeaker ? 'Edit Speaker' : 'Add Speaker'}
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Speaker's full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Title (EN)</label>
                  <input
                    type="text"
                    value={form.titleEn || ''}
                    onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                    placeholder="e.g. Pastor, Author"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Title (FR)</label>
                  <input
                    type="text"
                    value={form.titleFr || ''}
                    onChange={(e) => setForm((f) => ({ ...f, titleFr: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                    placeholder="ex. Pasteur, Auteur"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Biography / Biographie</label>
                <textarea
                  value={form.bio || ''}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F] resize-none"
                  rows={4}
                  placeholder="Speaker biography..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Photo URL (optional)</label>
                <input
                  type="url"
                  value={form.photoUrl || ''}
                  onChange={(e) => setForm((f) => ({ ...f, photoUrl: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving || !form.name}
                  className="flex-1 py-2.5 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] disabled:opacity-60"
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
