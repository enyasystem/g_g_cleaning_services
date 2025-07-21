"use client";
import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/admin-login";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin-auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  function handleLogin() {
    setAuthenticated(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin-auth", "true");
    }
  }

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }
  return <>{children}</>;
}
