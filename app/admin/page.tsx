"use client";
import DashboardOverview from "@/components/admin/dashboard-overview";
import { useRouter } from "next/navigation";
import { useState } from "react";

function GlobalLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" role="status" aria-label="Loading" />
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    // Remove cookie via API route
    await fetch("/api/admin/logout", { method: "POST" });
    setLoading(false);
    router.push("/admin-login");
  };

  return (
    <>
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
