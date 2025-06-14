export interface Booking {
  id: string
  clientName: string
  clientEmail: string
  serviceType: string
  date: string
  time: string
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  amount: string
  notes?: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  totalBookings: number
  lastBookingDate?: string
}

export const mockBookings: Booking[] = [
  {
    id: "1",
    clientName: "Alice Wonderland",
    clientEmail: "alice@example.com",
    serviceType: "Residential Cleaning",
    date: "2025-07-15",
    time: "10:00 AM",
    status: "Completed",
    amount: "$150.00",
  },
  {
    id: "2",
    clientName: "Bob The Builder",
    clientEmail: "bob@example.com",
    serviceType: "Handyman Services",
    date: "2025-07-18",
    time: "02:00 PM",
    status: "Confirmed",
    amount: "$200.00",
  },
  {
    id: "3",
    clientName: "Charlie Brown",
    clientEmail: "charlie@example.com",
    serviceType: "Garden Maintenance",
    date: "2025-07-20",
    time: "09:00 AM",
    status: "Pending",
    amount: "$120.00",
  },
  {
    id: "4",
    clientName: "Diana Prince",
    clientEmail: "diana@example.com",
    serviceType: "Deep Cleaning",
    date: "2025-07-22",
    time: "01:00 PM",
    status: "Pending",
    amount: "$350.00",
  },
  {
    id: "5",
    clientName: "Edward Scissorhands",
    clientEmail: "edward@example.com",
    serviceType: "Garden Maintenance",
    date: "2025-07-25",
    time: "11:00 AM",
    status: "Cancelled",
    amount: "$100.00",
  },
  {
    id: "6",
    clientName: "Fiona Gallagher",
    clientEmail: "fiona@example.com",
    serviceType: "Residential Cleaning",
    date: "2025-08-01",
    time: "09:30 AM",
    status: "Confirmed",
    amount: "$180.00",
  },
]

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Alice Wonderland",
    email: "alice@example.com",
    phone: "0411223344",
    totalBookings: 3,
    lastBookingDate: "2025-07-15",
  },
  {
    id: "c2",
    name: "Bob The Builder",
    email: "bob@example.com",
    phone: "0422334455",
    totalBookings: 5,
    lastBookingDate: "2025-07-18",
  },
  {
    id: "c3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "0433445566",
    totalBookings: 1,
    lastBookingDate: "2025-07-20",
  },
  {
    id: "c4",
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "0444556677",
    totalBookings: 2,
    lastBookingDate: "2025-07-22",
  },
]
