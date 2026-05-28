'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Filter, Download, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Attendee {
  id: string
  firstName: string
  lastName: string
  phone: string
  city: string
  maritalStatus: string
  registrationType: string
  status: string
  depositPaid: boolean
  feesConfirmed: boolean
  hasChildren: boolean
  numberOfChildren: number
  childrenAges: string | null
  dietaryNeeds: string | null
  notes: string | null
  language: string
  createdAt: string
}

const FEES: Record<string, number> = {
  EARLY_BIRD: 30000,
  REGULAR: 35000,
  CORE_TEAM: 50000,
}

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: 'bg-[#40916C] text-white',
  PENDING: 'bg-[#C9A84C] text-white',
  CANCELLED: 'bg-[#C9848A] text-white',
}

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterCity, setFilterCity] = useState('')
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const fetchAttendees = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (filterStatus) params.set('status', filterStatus)
    if (filterType) params.set('registrationType', filterType)
    if (filterCity) params.set('city', filterCity)
    params.set('page', String(page))
    params.set('limit', '20')

    const res = await fetch(`/api/attendees?${params}`)
    const data = await res.json()
    setAttendees(data.attendees || [])
    setTotal(data.total || 0)
    setTotalPages(data.totalPages || 1)
    setLoading(false)
  }, [search, filterStatus, filterType, filterCity, page])

  useEffect(() => {
    const timer = setTimeout(fetchAttendees, 300)
    return () => clearTimeout(timer)
  }, [fetchAttendees])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/attendees/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchAttendees()
    if (selectedAttendee?.id === id) {
      setSelectedAttendee((a) => (a ? { ...a, status } : null))
    }
  }

  const deleteAttendee = async (id: string) => {
    if (!confirm('Delete this attendee? / Supprimer ce participant ?')) return
    await fetch(`/api/attendees/${id}`, { method: 'DELETE' })
    setSelectedAttendee(null)
    fetchAttendees()
  }

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'City', 'Marital Status', 'Type', 'Amount', 'Deposit', 'Status', 'Has Children', 'Children Ages', 'Dietary', 'Notes', 'Language', 'Date']
    const rows = attendees.map((a) => [
      `${a.firstName} ${a.lastName}`,
      a.phone,
      a.city,
      a.maritalStatus,
      a.registrationType,
      FEES[a.registrationType] || '',
      a.depositPaid ? 'Yes' : 'No',
      a.status,
      a.hasChildren ? 'Yes' : 'No',
      a.childrenAges || '',
      a.dietaryNeeds || '',
      a.notes || '',
      a.language,
      new Date(a.createdAt).toLocaleDateString('fr-FR'),
    ])

    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `navcam2026-attendees-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Attendees / Participants
          </h1>
          <p className="text-gray-400 text-sm">{total} total registrations</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] transition-colors"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, city..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#1B3A5C] focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors ${
              showFilters ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]' : 'border-gray-200 text-gray-600 hover:border-[#2D6A4F]'
            }`}
          >
            <Filter size={15} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#2D6A4F]"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); setPage(1) }}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#2D6A4F]"
            >
              <option value="">All Types</option>
              <option value="EARLY_BIRD">Early Bird</option>
              <option value="REGULAR">Regular</option>
              <option value="CORE_TEAM">Core Team</option>
            </select>
            <input
              type="text"
              placeholder="Filter by city..."
              value={filterCity}
              onChange={(e) => { setFilterCity(e.target.value); setPage(1) }}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-3 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : attendees.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No attendees found / Aucun participant trouvé
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Phone', 'City', 'Type', 'Amount', 'Deposit', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendees.map((a, i) => (
                  <tr key={a.id} className={`border-t border-gray-50 hover:bg-gray-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-4 py-3 font-medium text-[#1B3A5C] whitespace-nowrap">
                      {a.firstName} {a.lastName}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{a.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{a.city}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-[#2D6A4F]/10 text-[#2D6A4F] px-2 py-0.5 rounded-full whitespace-nowrap">
                        {a.registrationType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#2D6A4F] font-medium whitespace-nowrap">
                      {formatCurrency(FEES[a.registrationType] || 0)}
                    </td>
                    <td className="px-4 py-3">
                      {a.depositPaid ? (
                        <CheckCircle size={16} className="text-[#40916C]" />
                      ) : (
                        <XCircle size={16} className="text-[#C9848A]" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${STATUS_COLORS[a.status] || 'bg-gray-200 text-gray-600'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedAttendee(a)}
                          className="p-1.5 text-[#1B3A5C] hover:bg-[#2D6A4F]/10 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye size={14} />
                        </button>
                        {a.status !== 'CONFIRMED' && (
                          <button
                            onClick={() => updateStatus(a.id, 'CONFIRMED')}
                            className="p-1.5 text-[#40916C] hover:bg-[#40916C]/10 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {a.status !== 'CANCELLED' && (
                          <button
                            onClick={() => updateStatus(a.id, 'CANCELLED')}
                            className="p-1.5 text-[#C9848A] hover:bg-[#C9848A]/10 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} of {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 text-gray-400 hover:text-[#2D6A4F] disabled:opacity-30 rounded-lg hover:bg-[#2D6A4F]/10 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs text-gray-600 px-2">{page} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 text-gray-400 hover:text-[#2D6A4F] disabled:opacity-30 rounded-lg hover:bg-[#2D6A4F]/10 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAttendee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedAttendee(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1B3A5C] text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selectedAttendee.firstName} {selectedAttendee.lastName}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${STATUS_COLORS[selectedAttendee.status]}`}>
                    {selectedAttendee.status}
                  </span>
                </div>
                <button onClick={() => setSelectedAttendee(null)} className="text-white/70 hover:text-white text-2xl">✕</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Phone', selectedAttendee.phone],
                  ['City', selectedAttendee.city],
                  ['Marital Status', selectedAttendee.maritalStatus],
                  ['Language', selectedAttendee.language.toUpperCase()],
                  ['Registration Type', selectedAttendee.registrationType.replace('_', ' ')],
                  ['Amount', formatCurrency(FEES[selectedAttendee.registrationType] || 0)],
                  ['Deposit Paid', selectedAttendee.depositPaid ? '✅ Yes' : '❌ No'],
                  ['Has Children', selectedAttendee.hasChildren ? `✅ Yes (${selectedAttendee.numberOfChildren})` : '❌ No'],
                  ['Registered', new Date(selectedAttendee.createdAt).toLocaleDateString('fr-FR')],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                    <p className="font-medium text-[#1B3A5C]">{value}</p>
                  </div>
                ))}
              </div>

              {selectedAttendee.dietaryNeeds && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Dietary Needs</p>
                  <p className="text-sm text-gray-700 bg-[#FDF6EC] rounded-xl p-3">{selectedAttendee.dietaryNeeds}</p>
                </div>
              )}

              {selectedAttendee.notes && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Notes</p>
                  <p className="text-sm text-gray-700 bg-[#FDF6EC] rounded-xl p-3">{selectedAttendee.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {selectedAttendee.status !== 'CONFIRMED' && (
                  <button
                    onClick={() => updateStatus(selectedAttendee.id, 'CONFIRMED')}
                    className="flex-1 py-2.5 bg-[#40916C] text-white rounded-xl text-sm font-medium hover:bg-[#2D6A4F] transition-colors"
                  >
                    Confirm ✅
                  </button>
                )}
                {selectedAttendee.status !== 'PENDING' && (
                  <button
                    onClick={() => updateStatus(selectedAttendee.id, 'PENDING')}
                    className="flex-1 py-2.5 bg-[#C9A84C] text-white rounded-xl text-sm font-medium hover:bg-[#B8963A] transition-colors"
                  >
                    Set Pending ⏳
                  </button>
                )}
                <button
                  onClick={() => deleteAttendee(selectedAttendee.id)}
                  className="px-4 py-2.5 bg-[#C9848A] text-white rounded-xl text-sm font-medium hover:bg-[#B8707A] transition-colors"
                >
                  Delete 🗑
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
