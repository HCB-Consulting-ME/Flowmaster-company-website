"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  FileText,
  Image as ImageIcon,
  ArrowRight,
  Lightbulb,
  MapPin,
  Settings,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  teamMembers: number;
  jobListings: number;
  solutions: number;
  locations: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    teamMembers: 0,
    jobListings: 0,
    solutions: 0,
    locations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Team Members",
      value: stats.teamMembers,
      icon: Users,
      href: "/admin/team",
      color: "bg-blue-500",
    },
    {
      title: "Job Listings",
      value: stats.jobListings,
      icon: Briefcase,
      href: "/admin/jobs",
      color: "bg-green-500",
    },
    {
      title: "Solutions",
      value: stats.solutions,
      icon: Lightbulb,
      href: "/admin/solutions",
      color: "bg-purple-500",
    },
    {
      title: "Locations",
      value: stats.locations,
      icon: MapPin,
      href: "/admin/locations",
      color: "bg-orange-500",
    },
  ];

  const quickActions = [
    {
      title: "Manage Pages",
      description: "Update hero sections, features, and page content",
      icon: FileText,
      href: "/admin/pages",
    },
    {
      title: "Manage Team",
      description: "Add and edit team members",
      icon: Users,
      href: "/admin/team",
    },
    {
      title: "Manage Jobs",
      description: "Create and edit job listings",
      icon: Briefcase,
      href: "/admin/jobs",
    },
    {
      title: "Upload Media",
      description: "Upload images and videos to the media library",
      icon: ImageIcon,
      href: "/admin/media",
    },
    {
      title: "Site Settings",
      description: "Update SEO, contact info, and branding",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-64">
        <AdminHeader
          title="Dashboard"
          description={`Welcome back, ${session?.user?.name || 'Admin'}!`}
        />

        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {statCards.map((stat) => (
              <Link key={stat.title} href={stat.href}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">
                        {isLoading ? "..." : stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} rounded-lg p-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-slate-100 p-2.5 group-hover:bg-blue-50">
                        <action.icon className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 group-hover:text-blue-600">
                          {action.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Getting Started</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Update Site Settings</h3>
                    <p className="text-sm text-slate-500">Configure your site title, description, and contact information</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href="/admin/settings">Go to Settings</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Edit Page Content</h3>
                    <p className="text-sm text-slate-500">Update hero sections, features, and page content</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href="/admin/pages">Manage Pages</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Manage Team & Jobs</h3>
                    <p className="text-sm text-slate-500">Add team members and post job listings</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href="/admin/team">Manage Team</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
