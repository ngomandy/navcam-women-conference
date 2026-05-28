import AdminLayout from '@/components/admin/AdminLayout'
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'

export default async function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // No session = login page (middleware handles dashboard protection)
  if (!session) {
    return <>{children}</>
  }

  return (
    <SessionProvider session={session}>
      <AdminLayout user={session.user}>
        {children}
      </AdminLayout>
    </SessionProvider>
  )
}
