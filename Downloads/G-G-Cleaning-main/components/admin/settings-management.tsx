"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SettingsManagement({ settings }: { settings: any[] }) {
  if (!settings || settings.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>No Settings Found</CardTitle>
          <CardDescription>No settings data is available to display.</CardDescription>
        </CardHeader>
      </Card>
    )
  }
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Settings Data</CardTitle>
        <CardDescription>Raw settings from Supabase:</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}
