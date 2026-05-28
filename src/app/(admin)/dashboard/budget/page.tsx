'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface BudgetItem {
  id: string
  category: string
  descriptionEn: string
  descriptionFr: string
  amount: number
  type: 'INCOME' | 'EXPENSE'
  status: string
  notes?: string
  createdAt: string
}

interface Summary {
  income: number
  expenses: number
  balance: number
}

const CATEGORIES = ['Registration Fees', 'Donations', 'Sponsorship', 'Venue', 'Catering', 'Accommodation', 'Transport', 'Materials', 'Decoration', 'Audio/Visual', 'Marketing', 'Team', 'Miscellaneous']
const STATUSES = ['PENDING', 'CONFIRMED', 'PAID', 'CANCELLED']

const emptyItem: Omit<BudgetItem, 'id' | 'createdAt'> = {
  category: CATEGORIES[0],
  descriptionEn: '',
  descriptionFr: '',
  amount: 0,
  type: 'EXPENSE',
  status: 'PENDING',
  notes: '',
}

export default function BudgetPage() {
  const [items, setItems] = useState<BudgetItem[]>([])
  const [summary, setSummary] = useState<Summary>({ income: 0, expenses: 0, balance: 0 })
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null)
  const [form, setForm] = useState<Omit<BudgetItem, 'id' | 'createdAt'>>(emptyItem)
  const [saving, setSaving] = useState(false)

  const fetchBudget = async () => {
    const params = new URLSearchParams()
    if (filterType) params.set('type', filterType)
    if (filterStatus) params.set('status', filterStatus)
    const res = await fetch(`/api/budget?${params}`)
    const data = await res.json()
    setItems(data.items || [])
    setSummary(data.summary || { income: 0, expenses: 0, balance: 0 })
    setLoading(false)
  }

  useEffect(() => { fetchBudget() }, [filterType, filterStatus])

  const openAdd = () => {
    setEditingItem(null)
    setForm({ ...emptyItem })
    setShowModal(true)
  }

  const openEdit = (item: BudgetItem) => {
    setEditingItem(item)
    setForm({ ...item })
    setShowModal(true)
  }

  const save = async () => {
    if (!form.descriptionEn || !form.amount) return
    setSaving(true)
    try {
      if (editingItem) {
        await fetch(`/api/budget/${editingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        await fetch('/api/budget', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setShowModal(false)
      fetchBudget()
    } finally {
      setSaving(false)
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this budget item?')) return
    await fetch(`/api/budget/${id}`, { method: 'DELETE' })
    fetchBudget()
  }

  const STATUS_BADGE: Record<string, string> = {
    PENDING: 'bg-[#C9A84C]/15 text-[#C9A84C]',
    CONFIRMED: 'bg-[#40916C]/15 text-[#40916C]',
    PAID: 'bg-[#2D6A4F]/15 text-[#2D6A4F]',
    CANCELLED: 'bg-[#C9848A]/15 text-[#C9848A]',
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Budget Tracker / Suivi Budgétaire
        </h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#40916C] transition-colors"
        >
          <Plus size={15} />
          Add Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#40916C]/10 rounded-xl flex items-center justify-center">
              <TrendingUp size={16} className="text-[#40916C]" />
            </div>
            <span className="text-xs text-gray-400">Total Income / Revenus</span>
          </div>
          <p className="text-xl font-bold text-[#40916C]">{formatCurrency(summary.income)}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#C9848A]/10 rounded-xl flex items-center justify-center">
              <TrendingDown size={16} className="text-[#C9848A]" />
            </div>
            <span className="text-xs text-gray-400">Total Expenses / Dépenses</span>
          </div>
          <p className="text-xl font-bold text-[#C9848A]">{formatCurrency(summary.expenses)}</p>
        </div>
        <div className={`rounded-2xl p-5 shadow-sm border ${summary.balance >= 0 ? 'bg-[#2D6A4F] border-[#2D6A4F]' : 'bg-[#C9848A] border-[#C9848A]'}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <DollarSign size={16} className="text-white" />
            </div>
            <span className="text-xs text-white/70">Balance / Solde</span>
          </div>
          <p className="text-xl font-bold text-white">{formatCurrency(summary.balance)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#2D6A4F]"
        >
          <option value="">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#2D6A4F]"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-10 text-center text-gray-400 text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-sm">
            No budget items yet. Add your first income or expense item.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Type', 'Category', 'Description', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id} className={`border-t border-gray-50 hover:bg-gray-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.type === 'INCOME' ? 'bg-[#40916C]/15 text-[#40916C]' : 'bg-[#C9848A]/15 text-[#C9848A]'
                      }`}>
                        {item.type === 'INCOME' ? '↑ Income' : '↓ Expense'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{item.category}</td>
                    <td className="px-4 py-3 text-[#1B3A5C]">
                      <p className="font-medium">{item.descriptionEn}</p>
                      {item.descriptionFr && <p className="text-xs text-gray-400">{item.descriptionFr}</p>}
                    </td>
                    <td className={`px-4 py-3 font-bold whitespace-nowrap ${item.type === 'INCOME' ? 'text-[#40916C]' : 'text-[#C9848A]'}`}>
                      {item.type === 'EXPENSE' ? '−' : '+'}{formatCurrency(item.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_BADGE[item.status] || 'bg-gray-100 text-gray-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-[#1B3A5C] hover:bg-[#2D6A4F]/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-1.5 text-[#C9848A] hover:bg-[#C9848A]/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1B3A5C] text-white p-5 rounded-t-3xl">
              <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editingItem ? 'Edit Budget Item' : 'Add Budget Item'}
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'INCOME' | 'EXPENSE' }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Description (EN) *</label>
                <input
                  type="text"
                  value={form.descriptionEn}
                  onChange={(e) => setForm((f) => ({ ...f, descriptionEn: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Description in English"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Description (FR)</label>
                <input
                  type="text"
                  value={form.descriptionFr}
                  onChange={(e) => setForm((f) => ({ ...f, descriptionFr: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="Description en français"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Amount (FCFA) *</label>
                <input
                  type="number"
                  min={0}
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3A5C] mb-1">Notes</label>
                <textarea
                  value={form.notes || ''}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D6A4F] resize-none"
                  rows={2}
                  placeholder="Optional notes..."
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
                  disabled={saving || !form.descriptionEn || !form.amount}
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
