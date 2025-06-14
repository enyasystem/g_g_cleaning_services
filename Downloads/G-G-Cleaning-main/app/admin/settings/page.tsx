import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Settings",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
          <CardDescription>Manage your application settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input id="adminEmail" type="email" defaultValue="admin@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="G&G Cleaning Services" />
          </div>
          <Button>Save Settings</Button>
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
    </div>
  )
}
