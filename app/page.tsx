import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Study Planner</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            Organize your studies,{' '}
            <span className="text-primary">ace your classes</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            The simple, focused study planner designed for college students. 
            Track your classes, assignments, and exams all in one place.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">
                Start Planning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Sign in to your account</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Everything you need to stay on track
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Class Management</h3>
              <p className="mt-2 text-muted-foreground">
                Add all your classes with custom colors to keep everything organized and easy to identify.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Assignment Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                Never miss a deadline. Track assignments, exams, projects, and quizzes with due dates.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <Calendar className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Calendar View</h3>
              <p className="mt-2 text-muted-foreground">
                See your entire month at a glance. Plan ahead and manage your workload effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built for students, by students. Start organizing your studies today.</p>
        </div>
      </footer>
    </main>
  )
}
