'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  UsersRound,
  Mic,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  user?: { name?: string | null; email?: string | null }
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', labelFr: 'Tableau de Bord', icon: LayoutDashboard },
  { href: '/dashboard/attendees', label: 'Attendees', labelFr: 'Participants', icon: Users },
  { href: '/dashboard/schedule', label: 'Schedule', labelFr: 'Programme', icon: Calendar },
  { href: '/dashboard/budget', label: 'Budget', labelFr: 'Budget', icon: DollarSign },
  { href: '/dashboard/team', label: 'Team', labelFr: 'Équipe', icon: UsersRound },
  { href: '/dashboard/speakers', label: 'Speakers', labelFr: 'Orateurs', icon: Mic },
]

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  const handleSignOut = () => signOut({ callbackUrl: '/login' })

  return (
    <div className="flex h-screen bg-[#F8F6F2] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#1B3A5C] flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌿</span>
            <div>
              <p
                className="text-white font-bold text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                NavCam 2026
              </p>
              <p className="text-[#74C69D] text-xs">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                  active
                    ? 'bg-[#2D6A4F] text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={active ? 'text-[#74C69D]' : 'text-gray-400 group-hover:text-[#74C69D]'} />
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs opacity-60">/ {item.labelFr}</span>
                </div>
                {active && <ChevronRight size={14} className="text-[#74C69D]" />}
              </Link>
            )
          })}
        </nav>

        {/* User & Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          {user && (
            <div className="mb-3 px-3">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-gray-400 text-xs truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all text-sm"
          >
            <LogOut size={16} />
            <span>Sign Out / Déconnexion</span>
          </button>
          <div className="mt-3 px-3">
            <Link href="/" className="text-xs text-[#74C69D] hover:text-white transition-colors">
              ← Back to site / Retour au site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-[#2D6A4F] hover:bg-[#74C69D]/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-sm font-semibold text-[#1B3A5C]">
                {navItems.find((n) => isActive(n.href))?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                NavCam Women&apos;s Conference 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-gray-400">
              {user?.name}
            </span>
            <div className="w-8 h-8 bg-[#2D6A4F] rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
