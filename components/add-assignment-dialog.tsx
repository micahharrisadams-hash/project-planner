'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { addAssignment } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Plus, Loader2, FileText } from 'lucide-react'
import type { Class } from '@/lib/types'

interface AddAssignmentDialogProps {
  classes: Class[]
}

export function AddAssignmentDialog({ classes }: AddAssignmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('assignment')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    
    if (selectedClass && selectedClass !== 'none') {
      formData.set('class_id', selectedClass)
    }
    formData.set('type', selectedType)
    
    const result = await addAssignment(formData)
    
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      setOpen(false)
      setIsLoading(false)
      setSelectedClass('')
      setSelectedType('assignment')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Assignment</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Chapter 5 Homework"
                required
              />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Additional details..."
                rows={2}
              />
            </Field>
            
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="due_date">Due Date</FieldLabel>
                <Input
                  id="due_date"
                  name="due_date"
                  type="date"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                  required
                />
              </Field>
              
              <Field>
                <FieldLabel>Type</FieldLabel>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            
            <Field>
              <FieldLabel>Class (optional)</FieldLabel>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No class</SelectItem>
                  {classes.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: classItem.color }}
                        />
                        {classItem.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          
          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}
          
          <div className="mt-6 flex justify-end gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Add Assignment
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
