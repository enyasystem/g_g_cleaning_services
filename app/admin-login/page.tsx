"use client";
import AdminLogin from "@/components/admin/admin-login";

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
    <>
      {loading && <GlobalLoadingSpinner />}
      <AdminLogin onLogin={() => {
        setLoading(true);
        setTimeout(() => {
          window.location.href = "/admin";
        }, 800);
      }} />
    </>
  );
}
