'use client'

import { useState } from 'react'
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns'
import { deleteAssignment, toggleAssignment } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Empty } from '@/components/ui/empty'
import { Calendar, Trash2, BookOpen, FileText, ClipboardList, GraduationCap } from 'lucide-react'
import type { Assignment } from '@/lib/types'

const typeIcons = {
  assignment: FileText,
  exam: GraduationCap,
  project: ClipboardList,
  quiz: BookOpen,
}

const typeColors = {
  assignment: 'bg-chart-1/10 text-chart-1',
  exam: 'bg-destructive/10 text-destructive',
  project: 'bg-chart-2/10 text-chart-2',
  quiz: 'bg-chart-3/10 text-chart-3',
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[]
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const upcomingAssignments = assignments
    .filter(a => !a.completed)
    .slice(0, 5)

  function formatDueDate(dateString: string) {
    const date = parseISO(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM d')
  }

  function getDueDateColor(dateString: string) {
    const date = parseISO(dateString)
    if (isPast(date) && !isToday(date)) return 'text-destructive'
    if (isToday(date)) return 'text-chart-3'
    if (isTomorrow(date)) return 'text-chart-1'
    return 'text-muted-foreground'
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    await deleteAssignment(id)
    setDeletingId(null)
  }

  async function handleToggle(id: string, completed: boolean) {
    await toggleAssignment(id, completed)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Assignments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingAssignments.length === 0 ? (
          <Empty
            icon={Calendar}
            title="No upcoming assignments"
            description="Add an assignment to get started"
          />
        ) : (
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => {
              const TypeIcon = typeIcons[assignment.type as keyof typeof typeIcons] || FileText
              return (
                <div
                  key={assignment.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    checked={assignment.completed}
                    onCheckedChange={(checked) => handleToggle(assignment.id, checked as boolean)}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">
                        {assignment.title}
                      </span>
                      <Badge variant="secondary" className={typeColors[assignment.type as keyof typeof typeColors]}>
                        <TypeIcon className="mr-1 h-3 w-3" />
                        {assignment.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {assignment.classes && (
                        <span 
                          className="inline-flex items-center gap-1 text-xs"
                          style={{ color: assignment.classes.color }}
                        >
                          <span 
                            className="h-2 w-2 rounded-full" 
                            style={{ backgroundColor: assignment.classes.color }}
                          />
                          {assignment.classes.name}
                        </span>
                      )}
                      <span className={`text-xs ${getDueDateColor(assignment.due_date)}`}>
                        Due {formatDueDate(assignment.due_date)}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(assignment.id)}
                    disabled={deletingId === assignment.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
