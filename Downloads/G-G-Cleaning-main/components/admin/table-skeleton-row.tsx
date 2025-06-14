// New file for skeleton row component
import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonRowProps {
  columns: number
}

export default function TableSkeletonRow({ columns }: TableSkeletonRowProps) {
  return (
    <TableRow>
      {Array.from({ length: columns }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton className="h-6 w-full" />
        </TableCell>
      ))}
    </TableRow>
  )
}
