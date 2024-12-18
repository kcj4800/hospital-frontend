'use client'

import { Appointment } from '@/types'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AppointmentListProps {
  appointments: Appointment[]
  onDelete?: (id: number) => void
}

export default function AppointmentList({ appointments, onDelete }: AppointmentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>환자명</TableHead>
          <TableHead>날짜</TableHead>
          <TableHead>시간</TableHead>
          <TableHead>증상</TableHead>
          <TableHead>작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.patientName}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.symptoms}</TableCell>
            <TableCell>
              {onDelete && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDelete(appointment.id)}
                >
                  삭제
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

