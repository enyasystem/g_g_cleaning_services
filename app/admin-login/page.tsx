"use client";
import AdminLogin from "@/components/admin/admin-login";
import { Toaster } from "@/components/ui/toaster";

import { useState } from "react";

function GlobalLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" role="status" aria-label="Loading" />
    </div>
  );
}

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40">
      {loading && <GlobalLoadingSpinner />}
      <div className="w-full max-w-md">
        <AdminLogin
          onLogin={() => {
            setLoading(true);
            setTimeout(() => {
              window.location.href = "/admin";
            }, 800);
          }}
          showToast
        />
        <div className="mt-6 flex justify-center">
          <a
            href="/"
            className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition font-semibold shadow focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Go back to main site"
          >
            ← Back to Main Site
          </a>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
