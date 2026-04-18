export interface Class {
  id: string
  user_id: string
  name: string
  color: string
  created_at: string
}

export interface Assignment {
  id: string
  user_id: string
  class_id: string | null
  title: string
  description: string | null
  due_date: string
  type: 'assignment' | 'exam' | 'project' | 'quiz'
  completed: boolean
  created_at: string
  classes?: Class
}
