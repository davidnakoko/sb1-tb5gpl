"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="relative border-r bg-card w-64">
      <ScrollArea className="absolute inset-0">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
            <div className="space-y-1">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center",
                    pathname === "/dashboard" && "text-primary"
                  )}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Overview
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link
                  href="/dashboard/students"
                  className={cn(
                    "flex items-center",
                    pathname === "/dashboard/students" && "text-primary"
                  )}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Students
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}