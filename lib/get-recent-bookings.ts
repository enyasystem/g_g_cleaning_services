
export async function getRecentBookings(limit = 5) {
  try {
    const res = await fetch(`/api/admin/bookings?limit=${limit}`)
    if (!res.ok) throw new Error("Error loading bookings.")
    const data = await res.json()
    return data || []
  } catch (error) {
    console.error("Error fetching recent bookings:", error)
    return []
  }
}
