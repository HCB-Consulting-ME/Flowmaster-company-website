"use client";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export default function AdminHeader({ title, description }: AdminHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {description && (
          <p className="text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* User */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <User className="h-5 w-5" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900">
              {session?.user?.name || session?.user?.email}
            </p>
            <p className="text-xs text-slate-500 capitalize">
              {session?.user?.role || "Admin"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
