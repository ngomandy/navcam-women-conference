'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { Users, CheckCircle, Clock, Star, DollarSign, TrendingUp } from 'lucide-react'

interface Stats {
  attendees: {
    total: number
    confirmed: number
    pending: number
    cancelled: number
    earlyBirds: number
    regular: number
    coreTeam: number
    depositPaid: number
  }
  revenue: {
    estimated: number
    budgetIncome: number
    budgetExpenses: number
    budgetBalance: number
  }
  recentRegistrations: Array<{
    id: string
    firstName: string
    lastName: string
    city: string
    phone: string
    registrationType: string
    status: string
    createdAt: string
  }>
}

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: 'bg-[#40916C] text-white',
  PENDING: 'bg-[#C9A84C] text-white',
  CANCELLED: 'bg-[#C9848A] text-white',
}

const TYPE_LABELS: Record<string, string> = {
  EARLY_BIRD: 'Early Bird',
  REGULAR: 'Regular',
  CORE_TEAM: 'Core Team',
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const quickLinks = [
    { href: '/dashboard/attendees', label: 'Manage Attendees', labelFr: 'Participants', color: 'bg-[#2D6A4F]', icon: '👥' },
    { href: '/dashboard/schedule', label: 'Edit Schedule', labelFr: 'Programme', color: 'bg-[#1B3A5C]', icon: '📋' },
    { href: '/dashboard/budget', label: 'Budget Tracker', labelFr: 'Budget', color: 'bg-[#C9A84C]', icon: '💰' },
    { href: '/dashboard/team', label: 'Committee', labelFr: 'Équipe', color: 'bg-[#C9848A]', icon: '🤝' },
    { href: '/dashboard/speakers', label: 'Speakers', labelFr: 'Orateurs', color: 'bg-[#40916C]', icon: '🎤' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'Total Attendees',
      labelFr: 'Total Participants',
      value: stats?.attendees.total ?? 0,
      icon: Users,
      color: 'bg-[#2D6A4F]',
      textColor: 'text-[#2D6A4F]',
      bgLight: 'bg-[#2D6A4F]/10',
    },
    {
      label: 'Confirmed',
      labelFr: 'Confirmés',
      value: stats?.attendees.confirmed ?? 0,
      icon: CheckCircle,
      color: 'bg-[#40916C]',
      textColor: 'text-[#40916C]',
      bgLight: 'bg-[#40916C]/10',
    },
    {
      label: 'Pending',
      labelFr: 'En Attente',
      value: stats?.attendees.pending ?? 0,
      icon: Clock,
      color: 'bg-[#C9A84C]',
      textColor: 'text-[#C9A84C]',
      bgLight: 'bg-[#C9A84C]/10',
    },
    {
      label: 'Early Birds',
      labelFr: 'Anticipées',
      value: stats?.attendees.earlyBirds ?? 0,
      icon: Star,
      color: 'bg-[#C9848A]',
      textColor: 'text-[#C9848A]',
      bgLight: 'bg-[#C9848A]/10',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2D6A4F] to-[#1B3A5C] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#74C69D] text-sm mb-1">
              NavCam Women&apos;s Conference 2026
            </p>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin Dashboard
            </h1>
            <p className="text-white/70 text-sm mt-1">
              August 10–14, 2026 • Care & Hope, Yaoundé
            </p>
          </div>
          <div className="text-5xl hidden sm:block">🌿</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 ${card.bgLight} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} className={card.textColor} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
              <p className="text-gray-500 text-xs mt-1">{card.label} / {card.labelFr}</p>
            </div>
          )
        })}
      </div>

      {/* Revenue & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center">
              <TrendingUp size={16} className="text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Estimated Revenue</p>
              <p className="text-xs text-gray-400">Revenus Estimés</p>
            </div>
          </div>
          <p className="text-xl font-bold text-[#C9A84C]">
            {formatCurrency(stats?.revenue.estimated ?? 0)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Based on {stats?.attendees.total ?? 0} registrations
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#40916C]/10 rounded-xl flex items-center justify-center">
              <DollarSign size={16} className="text-[#40916C]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Budget Balance</p>
              <p className="text-xs text-gray-400">Solde Budgétaire</p>
            </div>
          </div>
          <p className={`text-xl font-bold ${(stats?.revenue.budgetBalance ?? 0) >= 0 ? 'text-[#40916C]' : 'text-[#C9848A]'}`}>
            {formatCurrency(stats?.revenue.budgetBalance ?? 0)}
          </p>
          <div className="flex gap-3 mt-1 text-xs text-gray-400">
            <span>In: {formatCurrency(stats?.revenue.budgetIncome ?? 0)}</span>
            <span>Out: {formatCurrency(stats?.revenue.budgetExpenses ?? 0)}</span>
          </div>
        </div>
      </div>

      {/* Registration breakdown */}
      {stats && stats.attendees.total > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#1B3A5C] mb-4">Registration Breakdown</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#FDF6EC] rounded-xl p-3">
              <p className="text-lg font-bold text-[#2D6A4F]">{stats.attendees.earlyBirds}</p>
              <p className="text-xs text-gray-500 mt-0.5">Early Bird</p>
            </div>
            <div className="bg-[#FDF6EC] rounded-xl p-3">
              <p className="text-lg font-bold text-[#40916C]">{stats.attendees.regular}</p>
              <p className="text-xs text-gray-500 mt-0.5">Regular</p>
            </div>
            <div className="bg-[#FDF6EC] rounded-xl p-3">
              <p className="text-lg font-bold text-[#1B3A5C]">{stats.attendees.coreTeam}</p>
              <p className="text-xs text-gray-500 mt-0.5">Core Team</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-semibold text-[#1B3A5C] mb-3">Quick Links / Liens Rapides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.color} text-white rounded-2xl p-4 text-center hover:opacity-90 transition-opacity shadow-sm`}
            >
              <div className="text-2xl mb-1.5">{link.icon}</div>
              <p className="text-xs font-semibold">{link.label}</p>
              <p className="text-xs opacity-70">{link.labelFr}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-[#1B3A5C]">
            Recent Registrations / Inscriptions Récentes
          </h2>
          <Link
            href="/dashboard/attendees"
            className="text-xs text-[#40916C] hover:text-[#2D6A4F] font-medium"
          >
            View All →
          </Link>
        </div>

        {(stats?.recentRegistrations?.length ?? 0) === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No registrations yet / Pas encore d&apos;inscriptions
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'City', 'Type', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats?.recentRegistrations.map((r, i) => (
                  <tr key={r.id} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-4 py-2.5 font-medium text-[#1B3A5C]">
                      {r.firstName} {r.lastName}
                    </td>
                    <td className="px-4 py-2.5 text-gray-500">{r.city}</td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs bg-[#2D6A4F]/10 text-[#2D6A4F] px-2 py-0.5 rounded-full">
                        {TYPE_LABELS[r.registrationType] || r.registrationType}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[r.status] || 'bg-gray-200 text-gray-600'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-400 text-xs">
                      {new Date(r.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
