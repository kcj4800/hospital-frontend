'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AppointmentFormProps {
  onSubmit: (appointment: Omit<Appointment, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}

export default function AppointmentForm({ onSubmit, onCancel }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
    symptoms: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">새 예약</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="patientName">환자명</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">날짜</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="time">시간</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="symptoms">증상</Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit">
            예약하기
          </Button>
        </div>
      </form>
    </div>
  )
}

