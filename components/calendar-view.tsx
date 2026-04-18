'use client'

import { useState } from 'react'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  addMonths, 
  subMonths,
  isSameMonth,
  isSameDay,
  parseISO,
  isToday
} from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Assignment } from '@/lib/types'

interface CalendarViewProps {
  assignments: Assignment[]
}

export function CalendarView({ assignments }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const days: Date[] = []
  let day = startDate
  while (day <= endDate) {
    days.push(day)
    day = addDays(day, 1)
  }

  function getAssignmentsForDay(date: Date) {
    return assignments.filter(a => isSameDay(parseISO(a.due_date), date))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-px rounded-lg bg-border overflow-hidden">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
            <div
              key={dayName}
              className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground"
            >
              {dayName}
            </div>
          ))}
          {days.map((dayItem, idx) => {
            const dayAssignments = getAssignmentsForDay(dayItem)
            const isCurrentMonth = isSameMonth(dayItem, currentMonth)
            const isTodayDate = isToday(dayItem)
            
            return (
              <div
                key={idx}
                className={`min-h-[80px] bg-card p-1.5 ${
                  !isCurrentMonth ? 'bg-muted/30' : ''
                }`}
              >
                <div
                  className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    isTodayDate
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : isCurrentMonth
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {format(dayItem, 'd')}
                </div>
                <div className="space-y-0.5">
                  {dayAssignments.slice(0, 2).map((assignment) => (
                    <Badge
                      key={assignment.id}
                      variant="secondary"
                      className="w-full justify-start truncate text-[10px] px-1.5 py-0"
                      style={{
                        backgroundColor: assignment.classes?.color 
                          ? `${assignment.classes.color}20` 
                          : undefined,
                        color: assignment.classes?.color,
                        borderColor: assignment.classes?.color 
                          ? `${assignment.classes.color}40` 
                          : undefined,
                      }}
                    >
                      {assignment.title}
                    </Badge>
                  ))}
                  {dayAssignments.length > 2 && (
                    <span className="text-[10px] text-muted-foreground pl-1">
                      +{dayAssignments.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
