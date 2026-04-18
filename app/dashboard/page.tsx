import { createClient } from '@/lib/supabase/server'
import { UpcomingAssignments } from '@/components/upcoming-assignments'
import { ClassesList } from '@/components/classes-list'
import { CalendarView } from '@/components/calendar-view'
import { AddClassDialog } from '@/components/add-class-dialog'
import { AddAssignmentDialog } from '@/components/add-assignment-dialog'
import type { Class, Assignment } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: classes } = await supabase
    .from('classes')
    .select('*')
    .order('name')
  
  const { data: assignments } = await supabase
    .from('assignments')
    .select('*, classes(*)')
    .order('due_date')

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your classes and assignments</p>
        </div>
        <div className="flex gap-3">
          <AddClassDialog />
          <AddAssignmentDialog classes={(classes as Class[]) || []} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <UpcomingAssignments 
            assignments={(assignments as Assignment[]) || []} 
          />
          <CalendarView 
            assignments={(assignments as Assignment[]) || []} 
          />
        </div>
        <div>
          <ClassesList classes={(classes as Class[]) || []} />
        </div>
      </div>
    </div>
  )
}
