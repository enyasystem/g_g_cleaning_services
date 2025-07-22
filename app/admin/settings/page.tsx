"use client"
import { useEffect, useState } from "react"
import SettingsManagement from "@/components/admin/settings-management"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

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
              const res = await fetch("/api/admin/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: adminName, email: adminEmail })
              });
              if (res.ok) setUpdateMsg("Profile updated successfully.");
              else setUpdateMsg("Failed to update profile.");
            }}
          >Save Profile</Button>
          {updateMsg && <div className="text-sm text-green-600 mt-2">{updateMsg}</div>}
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
            onClick={async () => {
              setUpdateMsg(null);
              const res = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword })
              });
              const data = await res.json();
              if (res.ok) {
                setUpdateMsg("Password updated successfully.");
              } else {
                setUpdateMsg(data.debug || data.error || "Failed to update password.");
              }
            }}
          >Change Password</Button>
          {updateMsg && <div className="text-sm text-green-600 mt-2">{updateMsg}</div>}
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
            <Input id="bizEmail" type="email" defaultValue="Gilded183@gmail.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bizPhone">Phone</Label>
            <Input id="bizPhone" type="tel" defaultValue="0466065903" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bizAbn">ABN</Label>
            <Input id="bizAbn" defaultValue="20461679508" />
          </div>
          <Button>Save Business Info</Button>
        </CardContent>
      </Card>
      {/* SettingsManagement removed since Supabase is not used */}
    </div>
  )
}
