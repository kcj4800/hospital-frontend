'use client'

import { useEffect, useState } from 'react'
import AppointmentList from '@/components/AppointmentList'
import AppointmentForm from '@/components/AppointmentForm'
import { Button } from "@/components/ui/button"
import { Appointment } from '@/types'
import api from '@/lib/axios'

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const data = await api.get<Appointment[]>('/appointments')
      setAppointments(data)
    } catch (error) {
      console.error('예약 목록을 불러오는데 실패했습니다:', error)
    }
  }

  const handleSubmit = async (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
    try {
      await api.post<Appointment>('/appointments', appointmentData)
      fetchAppointments()
      setIsFormOpen(false)
    } catch (error) {
      console.error('예약 생성에 실패했습니다:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/appointments/${id}`)
      fetchAppointments()
    } catch (error) {
      console.error('예약 삭제에 실패했습니다:', error)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">병원 예약 시스템</h1>
      <Button onClick={() => setIsFormOpen(true)} className="mb-4">새 예약</Button>
      <AppointmentList appointments={appointments} onDelete={handleDelete} />
      {isFormOpen && (
        <AppointmentForm onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
      )}
    </main>
  )
}

