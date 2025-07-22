"use client";
import DashboardOverview from "@/components/admin/dashboard-overview";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function GlobalLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" role="status" aria-label="Loading" />
    </div>
  );
}

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    setLoading(false);
    toast({ title: "Logged out", description: "You have been logged out.", variant: "default" });
    setTimeout(() => {
      router.push("/admin-login");
    }, 1200);
  };

  return (
    <>
      <Toaster />
      {loading && <GlobalLoadingSpinner />}
      <div className="flex justify-between items-center p-4">
        <a
          href="/"
          className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition font-semibold shadow focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Go back to main site"
        >
          ← Back to Main Site
        </a>
        <button onClick={handleLogout} className="bg-destructive text-white px-4 py-2 rounded hover:bg-destructive/90 transition">Logout</button>
      </div>
      <DashboardOverview />
    </>
  );
}
