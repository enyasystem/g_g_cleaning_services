"use client"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import "@/styles/toast.css"
import SettingsManagement from "@/components/admin/settings-management"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    // Removed Supabase settings fetch
    // Optionally fetch admin info from API
    async function fetchAdmin() {
      try {
        const res = await fetch("/api/admin/profile");
        if (!res.ok) return;
        const data = await res.json();
        setAdminName(data.name || "");
        setAdminEmail(data.email || "");
      } catch {}
    }
    fetchAdmin();
  }, [])

  if (loading) return <div>Loading settings...</div>
  if (error) return <div>{error}</div>
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <CardDescription>Update your admin account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adminName">Admin Name</Label>
            <Input id="adminName" value={adminName} onChange={e => setAdminName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input id="adminEmail" type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
          </div>
          <Button
            onClick={async () => {
              setUpdateMsg(null);
              try {
                const res = await fetch("/api/admin/profile", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: adminName, email: adminEmail })
                });
                if (res.ok) {
                  toast({ title: "Profile Updated", description: "Profile updated successfully.", variant: "default" });
                } else {
                  toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" });
                }
              } catch {
                toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" });
              }
            }}
          >Save Profile</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your admin account password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current Password</Label>
            <Input id="oldPassword" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          <Button
            disabled={pwLoading}
            onClick={async () => {
              setUpdateMsg(null);
              setPwLoading(true);
              try {
                const res = await fetch("/api/admin/change-password", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ oldPassword, newPassword })
                });
                const data = await res.json();
                if (res.ok) {
                  toast({ title: "Password Changed", description: "Password updated successfully.", variant: "default" });
                  setOldPassword("");
                  setNewPassword("");
                } else {
                  toast({ title: "Error", description: data.debug || data.error || "Failed to update password.", variant: "destructive" });
                }
              } catch (err) {
                toast({ title: "Error", description: "Failed to update password.", variant: "destructive" });
              }
              setPwLoading(false);
            }}
          >
            {pwLoading ? <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-white rounded-full inline-block"></span> : null}
            Change Password
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Update your public business details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bizAddress">Address</Label>
            <Input id="bizAddress" defaultValue="77/ Harris street Fairfield" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bizEmail">Email</Label>
            <Input id="bizEmail" type="email" defaultValue="gngcleaningsercices@outlook.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bizPhone">Phone</Label>
            <Input id="bizPhone" type="tel" defaultValue="0466065903" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bizAbn">ABN</Label>
            <Input id="bizAbn" defaultValue="20461679508" />
          </div>
          <Button
            onClick={() => {
              toast({ title: "Business Info Saved", description: "Business information updated successfully.", variant: "default" });
            }}
          >Save Business Info</Button>
        </CardContent>
      </Card>
    <Toaster />
    </div>
  )
}
