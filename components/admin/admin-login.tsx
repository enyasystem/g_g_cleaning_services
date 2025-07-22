"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";



export default function AdminLogin({ onLogin, showToast }: { onLogin: () => void, showToast?: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      if (res.ok) {
        if (showToast) toast({ title: "Login successful", description: "Welcome to the admin dashboard!" });
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
        if (showToast) toast({ title: "Login failed", description: data.error || "Invalid credentials", variant: "destructive" });
      }
    } catch (err) {
      setError("Network error");
      if (showToast) toast({ title: "Network error", description: "Unable to connect to server.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-lg shadow-lg w-full max-w-sm border border-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-foreground">Email</label>
          <input
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-foreground">Password</label>
          <input
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition font-semibold flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
