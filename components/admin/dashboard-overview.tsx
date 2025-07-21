"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, CalendarCheck, Users, DollarSign, ClipboardList } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Booking } from "@/lib/data"


export default function DashboardOverview() {
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [activeClients, setActiveClients] = useState<number>(0)

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/admin/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        const bookings = data.map((b: any) => ({
          id: b.id,
          clientName: b.client?.name || b.clientName || "Unknown",
          clientEmail: b.client?.email || b.clientEmail || "",
          serviceType: b.serviceType || "",
          date: b.date || b.createdAt || "",
          status: b.status || "Pending",
          amount: b.amount || 0,
        }));
        setRecentBookings(bookings.slice(0, 5));
      } catch (err) {
        setRecentBookings([]);
      }
    }
    async function fetchClients() {
      try {
        const res = await fetch("/api/admin/clients");
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json();
        setActiveClients(data.length);
      } catch (err) {
        setActiveClients(0);
      }
    }
    fetchBookings();
    fetchClients();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{recentBookings.length}</div>
            <p className="text-xs text-muted-foreground">+15 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">Total registered clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Offered</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">View & manage services</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>A quick look at the latest service requests.</CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/admin/bookings">
              View All <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.clientName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">{booking.clientEmail}</div>
                  </TableCell>
                  <TableCell>{booking.serviceType}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "Completed"
                          ? "default"
                          : booking.status === "Pending"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{booking.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
