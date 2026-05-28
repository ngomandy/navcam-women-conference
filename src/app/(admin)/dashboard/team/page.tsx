'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Users } from 'lucide-react'

interface CommitteeMember {
  id: string
  name: string
  roleEn: string
  roleFr: string
  phone?: string
  email?: string
  createdAt: string
}

const ROLES_EN = [
  'General Coordination',
  'Logistics & Venue',
  'Catering',
  'Finance & Fundraising',
  'Prayer',
  'Decoration & Ambience',
  'Translation & Interpretation',
  "Children's Program",
  'Program',
  'Praise & Worship',
  'Communications',
  'Other',
]

const ROLES_FR: Record<string, string> = {
  'General Coordination': 'Coordination Générale',
  'Logistics & Venue': 'Logistique & Lieu',
  'Catering': 'Restauration',
  'Finance & Fundraising': 'Finance & Collecte de Fonds',
  'Prayer': 'Prière',
  'Decoration & Ambience': 'Décoration & Ambiance',
  'Translation & Interpretation': 'Traduction & Interprétation',
  "Children's Program": 'Programme Enfants',
  'Program': 'Programme',
  'Praise & Worship': 'Louange & Adoration',
  'Communications': 'Communications',
  'Other': 'Autre',
}

const ROLE_COLORS: Record<string, string> = {
  'General Coordination': 'bg-[#1B3A5C]',
  'Logistics & Venue': 'bg-[#2D6A4F]',
  'Catering': 'bg-[#C9848A]',
  'Finance & Fundraising': 'bg-[#C9A84C]',
  'Prayer': 'bg-[#40916C]',
  'Decoration & Ambience': 'bg-[#74C69D]',
  'Translation & Interpretation': 'bg-[#2E5F8A]',
  "Children's Program": 'bg-[#F4C2C2]',
  'Program': 'bg-[#40916C]',
  'Praise & Worship': 'bg-[#C9848A]',
}

const emptyMember: Omit<CommitteeMember, 'id' | 'createdAt'> = {
  name: '',
  roleEn: ROLES_EN[0],
  roleFr: ROLES_FR[ROLES_EN[0]],
  phone: '',
  email: '',
}

// Group members by role
function groupByRole(members: CommitteeMember[]) {
  const groups: Record<string, CommitteeMember[]> = {}
  for (const m of members) {
    if (!groups[m.roleEn]) groups[m.roleEn] = []
    groups[m.roleEn].push(m)
  }
  return groups
}

export default function TeamPage() {
  const [members, setMembers] = useState<CommitteeMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null)
  const [form, setForm] = useState<Omit<CommitteeMember, 'id' | 'createdAt'>>(emptyMember)
  const [saving, setSaving] = useState(false)

  const fetchMembers = async () => {
    const res = await fetch('/api/team')
    const data = await res.json()
    setMembers(data.members || [])
    setLoading(false)
  }

  useEffect(() => { fetchMembers() }, [])

  const openAdd = () => {
    setEditingMember(null)
    setForm({ ...emptyMember })
    setShowModal(true)
  }

  const openEdit = (m: CommitteeMember) => {
    setEditingMember(m)
    setForm({ name: m.name, roleEn: m.roleEn, roleFr: m.roleFr, phone: m.phone || '', email: m.email || '' })
    setShowModal(true)
  }

  const save = async () => {
    if (!form.name || !form.roleEn) return
    setSaving(true)
    try {
      const payload = {
        ...form,
        roleFr: form.roleFr || ROLES_FR[form.roleEn] || form.roleEn,
      }
      if (editingMember) {
        await fetch(`/api/team/${editingMember.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      setShowModal(false)
      fetchMembers()
    } finally {
      setSaving(false)
    }
  }

  const deleteMember = async (id: string) => {
    if (!confirm('Delete this committee member?')) return
    await fetch(`/api/team/${id}`, { method: 'DELETE' })
    fetchMembers()
  }

  const groups = groupByRole(members)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Committee / Comité
          </h1>
          <p className="text-gray-400 text-sm">{members.length} members across {Object.keys(groups).length} teams</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] transition-colors"
        >
          <Plus size={15} />
          Add Member
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400 text-sm">Loading...</div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100">
          <Users size={40} className="mx-auto mb-3 text-gray-200" />
          <p>No committee members yet. Add the first member or run the seed script.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groups).map(([role, roleMembers]) => (
            <div key={role} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${ROLE_COLORS[role] || 'bg-gray-400'}`} />
                <h3 className="text-sm font-bold text-[#1B3A5C]">{role}</h3>
                <span className="text-xs text-gray-400">/ {ROLES_FR[role] || role}</span>
                <span className="ml-auto text-xs text-gray-400">{roleMembers.length} member{roleMembers.length > 1 ? 's' : ''}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {roleMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${ROLE_COLORS[member.roleEn] || 'bg-gray-400'}`}
                      >
                        {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1B3A5C] text-sm">{member.name}</p>
                        <div className="flex gap-3 text-xs text-gray-400">
                          {member.phone && <span>📞 {member.phone}</span>}
                          {member.email && <span>✉ {member.email}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEdit(member)}
                        className="p-2 text-[#1B3A5C] hover:bg-[#2D6A4F]/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        className="p-2 text-[#C9848A] hover:bg-[#C9848A]/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1B3A5C] text-white p-5 rounded-t-3xl">
              <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editingMember ? 'Edit Member' : 'Add Committee Member'}
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
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Role (English) *</label>
                <select
                  value={form.roleEn}
                  onChange={(e) => setForm((f) => ({
                    ...f,
                    roleEn: e.target.value,
                    roleFr: ROLES_FR[e.target.value] || f.roleFr,
                  }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                >
                  {ROLES_EN.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Role (French / Rôle)</label>
                <input
                  type="text"
                  value={form.roleFr}
                  onChange={(e) => setForm((f) => ({ ...f, roleFr: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Rôle en français"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone || ''}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                    placeholder="+237..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email || ''}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                    placeholder="email@..."
                  />
                </div>
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
                  disabled={saving || !form.name || !form.roleEn}
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
