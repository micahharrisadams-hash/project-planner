'use client'

import { useState } from 'react'
import { deleteClass } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'
import { GraduationCap, Trash2 } from 'lucide-react'
import type { Class } from '@/lib/types'

interface ClassesListProps {
  classes: Class[]
}

export function ClassesList({ classes }: ClassesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    await deleteClass(id)
    setDeletingId(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          My Classes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {classes.length === 0 ? (
          <Empty
            icon={GraduationCap}
            title="No classes yet"
            description="Add your first class to organize assignments"
          />
        ) : (
          <div className="space-y-2">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: classItem.color }}
                  />
                  <span className="font-medium text-foreground">{classItem.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(classItem.id)}
                  disabled={deletingId === classItem.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
