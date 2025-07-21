import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteBooking(id: string) {
  try {
    const bookingId = Number(id);
    if (isNaN(bookingId)) {
      return { success: false, message: "Invalid booking ID." };
    }
    await prisma.booking.delete({
      where: { id: bookingId },
    });
    revalidatePath("/admin/bookings");
    return { success: true, message: "Booking deleted successfully." };
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    return { success: false, message: error?.message || "Failed to delete booking." };
  }
}

export async function updateBookingStatus(id: string, newStatus: string) {
  try {
    const bookingId = Number(id);
    if (isNaN(bookingId)) {
      return { success: false, message: "Invalid booking ID." };
    }
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });
    revalidatePath("/admin/bookings");
    return { success: true, message: `Booking status updated to ${newStatus}.` };
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    return { success: false, message: error?.message || "Failed to update booking status." };
  }
}
