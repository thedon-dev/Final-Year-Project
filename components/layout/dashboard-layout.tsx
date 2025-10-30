"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Building2,
  Home,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  LayoutDashboard,
  FileText,
  BarChart3,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const landlordNav = [
  { name: "Dashboard", href: "/landlord/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/landlord/properties", icon: Building2 },
  { name: "Units", href: "/landlord/units", icon: Home },
  { name: "Tenants", href: "/landlord/tenants", icon: Users },
  { name: "Payments", href: "/landlord/payments", icon: DollarSign },
  { name: "Reports", href: "/landlord/reports", icon: BarChart3 },
];

const tenantNav = [
  { name: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
  { name: "Browse Properties", href: "/tenant/browse", icon: Search },
  { name: "My Rentals", href: "/tenant/rentals", icon: Home },
  { name: "Payments", href: "/tenant/payments", icon: DollarSign },
  { name: "Documents", href: "/tenant/documents", icon: FileText },
];

const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "landlord" | "tenant" | "admin";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navigation =
    role === "landlord"
      ? landlordNav
      : role === "tenant"
      ? tenantNav
      : adminNav;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <MobileNav
                navigation={navigation}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2 ml-2 md:ml-0">
            <Building2 className="h-6 w-6" />
            <span className="font-bold">PropManager</span>
          </Link>

          <div className="flex-1" />

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex h-full border mt-16">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:fixed top-16 md:h-full w-64 flex-col border-r">
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 ml-64">{children}</main>
      </div>
    </div>
  );
}

function MobileNav({
  navigation,
  pathname,
  onNavigate,
}: {
  navigation: typeof landlordNav;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-6 border-b">
        <Building2 className="h-6 w-6" />
        <span className="font-bold">PropManager</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
