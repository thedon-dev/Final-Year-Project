import { Button } from "@/components/ui/button"
import { Building2, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">PropManager</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Manage Your Properties with Ease
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            The complete solution for landlords and tenants. Track payments, manage leases, and streamline property
            management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/register">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tenant/browse">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Property Management</h3>
            <p className="text-muted-foreground">Easily manage multiple properties and units from a single dashboard</p>
          </div>
          <div className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Payment Tracking</h3>
            <p className="text-muted-foreground">Track rent payments, send reminders, and generate financial reports</p>
          </div>
          <div className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Secure & Reliable</h3>
            <p className="text-muted-foreground">Bank-level security with automated backups and data protection</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span className="font-semibold">PropManager</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 PropManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
