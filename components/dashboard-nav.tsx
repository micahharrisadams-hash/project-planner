'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { BookOpen, LogOut } from 'lucide-react'

interface DashboardNavProps {
  userEmail: string
}

export function DashboardNav({ userEmail }: DashboardNavProps) {
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Study Planner</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{userEmail}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}
