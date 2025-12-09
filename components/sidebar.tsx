"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar, CreditCard, Users, Settings, User, BarChart, Activity } from "lucide-react";

export function Sidebar() {
    const params = useParams();
    const pathname = usePathname();
    const workspaceId = params.workspaceId as string;

    // Mock workspace ID if not present (for demo purposes, or redirect logic)
    // In a real app, we'd fetch the user's last active workspace
    const effectiveWorkspaceId = workspaceId || "ws_123";

    const isActive = (path: string) => pathname?.startsWith(path);

    return (
        <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block flex-shrink-0">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">FluxSpace</h1>
            </div>
            <nav className="space-y-2">
                <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Workspace</p>
                    <Link
                        href={`/workspaces/${effectiveWorkspaceId}/projects`}
                        className={cn("flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 transition-colors", isActive(`/workspaces/${effectiveWorkspaceId}/projects`) && "bg-slate-800 text-blue-400")}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Projects
                    </Link>
                    <Link
                        href={`/workspaces/${effectiveWorkspaceId}/calendar`}
                        className={cn("flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 transition-colors", isActive(`/workspaces/${effectiveWorkspaceId}/calendar`) && "bg-slate-800 text-blue-400")}
                    >
                        <Calendar className="h-4 w-4" />
                        Calendar
                    </Link>
                    <Link
                        href={`/workspaces/${effectiveWorkspaceId}/analytics`}
                        className={cn("flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 transition-colors", isActive(`/workspaces/${effectiveWorkspaceId}/analytics`) && "bg-slate-800 text-blue-400")}
                    >
                        <BarChart className="h-4 w-4" />
                        Analytics
                    </Link>
                    <Link
                        href={`/workspaces/${effectiveWorkspaceId}/activity`}
                        className={cn("flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 transition-colors", isActive(`/workspaces/${effectiveWorkspaceId}/activity`) && "bg-slate-800 text-blue-400")}
                    >
                        <Activity className="h-4 w-4" />
                        Activity Log
                    </Link>
                    <Link
                        href={`/workspaces/${effectiveWorkspaceId}/team`}
                        className={cn("flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 transition-colors", isActive(`/workspaces/${effectiveWorkspaceId}/team`) && "bg-slate-800 text-blue-400")}
                    >
                        <Users className="h-4 w-4" />
                        Team
                    </Link>
                    <Link
                        href={`/workspaces/${effectiveWorkspaceId}/plans`}
                        className={cn("flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 transition-colors", isActive(`/workspaces/${effectiveWorkspaceId}/plans`) && "bg-slate-800 text-blue-400")}
                    >
                        <CreditCard className="h-4 w-4" />
                        Billing & Plans
                    </Link>
                </div>

                <div className="pt-4 border-t border-slate-700">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Account</p>
                    <Link
                        href="/account/settings"
                        className={cn("flex items-center gap-3 py-2 px-4 rounded hover:bg-slate-800 transition-colors", isActive("/account/settings") && "bg-slate-800 text-blue-400")}
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
