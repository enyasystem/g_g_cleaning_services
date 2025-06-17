// This file is now unused. All booking actions must be handled client-side for static export compatibility.

// "use server"

// import { getServerSupabase } from "@/lib/supabase/server"
// import { revalidatePath } from "next/cache"
// import { format } from "date-fns"

// interface BookingFormData {
//   fullName: string
//   email: string
//   phone: string
//   address: string
//   serviceType: string
//   preferredDate: Date
//   preferredTime: string
//   notes?: string
// }

// export async function createBooking(formData: BookingFormData) {
//   const supabase = getServerSupabase()

//   try {
//     const { data, error } = await supabase.from("bookings").insert({
//       full_name: formData.fullName,
//       email: formData.email,
//       phone: formData.phone,
//       address: formData.address,
//       service_type: formData.serviceType,
//       preferred_date: format(formData.preferredDate, "yyyy-MM-dd"), // Format date for DB
//       preferred_time: formData.preferredTime,
//       notes: formData.notes,
//       status: "Pending", // Default status
//     })

//     if (error) {
//       console.error("Error inserting booking:", error)
//       return { success: false, message: "Failed to submit booking. Please try again." }
//     }

//     revalidatePath("/admin/bookings") // Revalidate the bookings page in admin dashboard
//     return { success: true, message: "Booking submitted successfully!" }
//   } catch (error) {
//     console.error("Unexpected error in createBooking:", error)
//     return { success: false, message: "An unexpected error occurred." }
//   }
// }

// export async function deleteBooking(id: string) {
//   const supabase = getServerSupabase()
//   try {
//     const { error } = await supabase.from("bookings").delete().eq("id", id)

//     if (error) {
//       console.error("Error deleting booking:", error)
//       return { success: false, message: "Failed to delete booking." }
//     }

//     revalidatePath("/admin/bookings")
//     return { success: true, message: "Booking deleted successfully." }
//   } catch (error) {
//     console.error("Unexpected error in deleteBooking:", error)
//     return { success: false, message: "An unexpected error occurred during deletion." }
//   }
// }

// export async function updateBookingStatus(id: string, newStatus: string) {
//   const supabase = getServerSupabase()
//   try {
//     const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id)

//     if (error) {
//       console.error("Error updating booking status:", error)
//       return { success: false, message: "Failed to update booking status." }
//     }

//     revalidatePath("/admin/bookings")
//     return { success: true, message: "Booking status updated successfully." }
//   } catch (error) {
//     console.error("Unexpected error in updateBookingStatus:", error)
//     return { success: false, message: "An unexpected error occurred during status update." }
//   }
// }
