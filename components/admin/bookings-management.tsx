"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { MoreHorizontal, PlusCircle, FileDown, ArrowUpDown, CalendarIcon, Inbox, SearchX } from "lucide-react"
import type { Booking } from "@/lib/data" // Only import type, data will come from props
import TableSkeletonRow from "./table-skeleton-row"
import { useTableControls, type SortConfig } from "@/hooks/use-table-controls"
import { DataTablePagination } from "./data-table-pagination"
import { format, isValid, parseISO } from "date-fns"
import type { DateRange } from "react-day-picker"
import { deleteBooking, updateBookingStatus } from "@/app/actions/booking-actions" // Import new server actions
import { useToast } from "@/hooks/use-toast"

// Helper to create sortable table headers
const SortableTableHead = ({
  children,
  onClick,
  sortKey,
  currentSortConfig,
}: {
  children: React.ReactNode
  onClick: () => void
  sortKey: keyof Booking
  currentSortConfig: SortConfig<Booking>
}) => (
  <TableHead onClick={onClick} className="cursor-pointer hover:bg-muted/50">
    <div className="flex items-center gap-2">
      {children}
      {currentSortConfig.key === sortKey && (
        <ArrowUpDown className={`h-4 w-4 ${currentSortConfig.direction === "descending" ? "rotate-180" : ""}`} />
      )}
    </div>
  </TableHead>
)

interface BookingsManagementProps {
  initialBookings: Booking[]
}

export default function BookingsManagement({ initialBookings }: BookingsManagementProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)

  const {
    paginatedData: filteredBookings,
    requestSort,
    sortConfig,
    currentPage,
    totalPages,
    setItemsPerPage,
    itemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    globalSearchTerm,
    setGlobalSearchTerm,
    updateData: updateBookingsData,
    filteredDataCount,
  } = useTableControls<Booking>({
    initialData: initialBookings, // Use initialBookings from props
    initialItemsPerPage: 5,
    dateKeys: ["date"],
  })

  // Update the hook's internal data when initialBookings prop changes
  useEffect(() => {
    setIsLoading(true)
    // Simulate a slight delay for loading state, then update with actual data
    const timer = setTimeout(() => {
      updateBookingsData(initialBookings)
      setIsLoading(false)
    }, 500) // Reduced delay for quicker feedback
    return () => clearTimeout(timer)
  }, [initialBookings, updateBookingsData])

  const bookingsToDisplay = filteredBookings.filter((booking) => {
    const statusMatch = statusFilter === "all" || booking.status.toLowerCase() === statusFilter
    let dateMatch = true
    if (dateRange?.from && isValid(parseISO(booking.date))) {
      const bookingDate = parseISO(booking.date)
      if (dateRange.to) {
        dateMatch = bookingDate >= dateRange.from && bookingDate <= dateRange.to
      } else {
        dateMatch = bookingDate >= dateRange.from
      }
    }
    return statusMatch && dateMatch
  })

  const handleDeleteBooking = async () => {
    if (selectedBookingId) {
      setIsLoading(true) // Show loading state during deletion
      const result = await deleteBooking(selectedBookingId)
      if (result.success) {
        toast({ title: "Success", description: result.message })
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" })
      }
      setShowDeleteDialog(false)
      setSelectedBookingId(null)
      // Data will be revalidated by revalidatePath in the server action
      // No need to manually update local state here as the page will re-render with fresh data
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: Booking["status"]) => {
    setIsLoading(true) // Show loading state during update
    const result = await updateBookingStatus(id, newStatus)
    if (result.success) {
      toast({ title: "Success", description: result.message })
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" })
    }
    // Data will be revalidated by revalidatePath in the server action
  }

  const handleCancelBookingStatus = async () => {
    if (selectedBookingId) {
      setIsLoading(true) // Show loading state during cancellation
      const result = await updateBookingStatus(selectedBookingId, "Cancelled")
      if (result.success) {
        toast({ title: "Success", description: result.message })
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" })
      }
      setShowCancelDialog(false)
      setSelectedBookingId(null)
      // Data will be revalidated by revalidatePath in the server action
    }
  }

  const openDeleteDialog = (id: string) => {
    setSelectedBookingId(id)
    setShowDeleteDialog(true)
  }
  const openCancelDialog = (id: string) => {
    setSelectedBookingId(id)
    setShowCancelDialog(true)
  }

  const numberOfColumns = 6

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Manage Bookings</CardTitle>
              <CardDescription>View, edit, and manage all client bookings.</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" disabled={isLoading}>
                <FileDown className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button size="sm" disabled={isLoading}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 flex-wrap">
            <Input
              placeholder="Search all fields..."
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              className="max-w-xs sm:max-w-sm flex-grow"
              disabled={isLoading}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={`w-full sm:w-[300px] justify-start text-left font-normal ${
                    !dateRange && "text-muted-foreground"
                  }`}
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            {dateRange && (
              <Button variant="ghost" onClick={() => setDateRange(undefined)} disabled={isLoading}>
                Clear Dates
              </Button>
            )}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableTableHead
                    onClick={() => requestSort("clientName")}
                    sortKey="clientName"
                    currentSortConfig={sortConfig}
                  >
                    Client
                  </SortableTableHead>
                  <SortableTableHead
                    onClick={() => requestSort("serviceType")}
                    sortKey="serviceType"
                    currentSortConfig={sortConfig}
                  >
                    Service
                  </SortableTableHead>
                  <SortableTableHead onClick={() => requestSort("date")} sortKey="date" currentSortConfig={sortConfig}>
                    Date & Time
                  </SortableTableHead>
                  <SortableTableHead
                    onClick={() => requestSort("status")}
                    sortKey="status"
                    currentSortConfig={sortConfig}
                  >
                    Status
                  </SortableTableHead>
                  <SortableTableHead
                    onClick={() => requestSort("amount")}
                    sortKey="amount"
                    currentSortConfig={sortConfig}
                  >
                    <span className="text-right block w-full">Amount</span>
                  </SortableTableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <TableSkeletonRow key={index} columns={numberOfColumns} />
                  ))
                ) : bookingsToDisplay.length > 0 ? (
                  bookingsToDisplay.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="font-medium">{booking.clientName}</div>
                        <div className="text-sm text-muted-foreground">{booking.clientEmail}</div>
                      </TableCell>
                      <TableCell>{booking.serviceType}</TableCell>
                      <TableCell>
                        {format(parseISO(booking.date), "LLL dd, y")} <br />{" "}
                        <span className="text-xs text-muted-foreground">{booking.time}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "Completed"
                              ? "default"
                              : booking.status === "Pending"
                                ? "secondary"
                                : booking.status === "Confirmed"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{booking.amount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => console.log("Edit", booking.id)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "Confirmed")}>
                              Mark Confirmed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "Completed")}>
                              Mark Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openCancelDialog(booking.id)} className="text-orange-600">
                              Cancel Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDeleteDialog(booking.id)} className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={numberOfColumns} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        {globalSearchTerm || statusFilter !== "all" || dateRange ? (
                          <>
                            <SearchX className="h-12 w-12 text-muted-foreground" />
                            <p className="text-muted-foreground">No bookings match your current filters.</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setGlobalSearchTerm("")
                                setStatusFilter("all")
                                setDateRange(undefined)
                              }}
                            >
                              Clear Filters
                            </Button>
                          </>
                        ) : (
                          <>
                            <Inbox className="h-12 w-12 text-muted-foreground" />
                            <p className="text-muted-foreground">No bookings found.</p>
                            <Button size="sm">
                              <PlusCircle className="mr-2 h-4 w-4" /> Add Booking
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {!isLoading && totalPages > 0 && (
            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredDataCount}
              onPageChange={goToPage}
              onItemsPerPageChange={(value) => setItemsPerPage(Number(value))}
              canPreviousPage={currentPage > 1}
              canNextPage={currentPage < totalPages}
            />
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedBookingId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBooking} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Booking Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking Cancellation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this booking as &quot;Cancelled&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedBookingId(null)}>Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelBookingStatus} className="bg-orange-500 hover:bg-orange-600">
              Confirm Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
