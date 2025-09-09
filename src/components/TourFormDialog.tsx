
import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField } from '@mui/material'
import type { Tour } from '@/types/tour'

export default function TourFormDialog({
  open, onClose, initial, onSubmit
}: {
  open: boolean
  onClose: () => void
  initial?: Tour
  onSubmit: (data: Tour) => void
}){
  const [form, setForm] = useState<Tour>(initial ?? { type: 'tour', name: '', price: 0, durationHours: 1 })

  useEffect(()=>{ if (initial) setForm(initial) }, [initial])

  const handleSave = () => {
    if (!form.name) return alert('กรุณากรอกชื่อทัวร์')
    if ((form.price ?? 0) <= 0) return alert('กรุณากรอกราคาให้ถูกต้อง')
    if ((form.durationHours ?? 0) <= 0) return alert('กรุณากรอกระยะเวลาให้ถูกต้อง')
    if (form.rating && (form.rating < 0 || form.rating > 5)) return alert('เรตติ้งต้องอยู่ระหว่าง 0-5')
    onSubmit(form)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{form.id ? 'แก้ไขทัวร์' : 'เพิ่มทัวร์'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="ชื่อทัวร์ *" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField label="เมือง" value={form.city||''} onChange={e=>setForm({...form, city:e.target.value})}/>
          <TextField label="ราคา (THB) *" type="number" value={form.price ?? ''} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
          <TextField label="ระยะเวลา (ชั่วโมง) *" type="number" value={form.durationHours ?? ''} onChange={e=>setForm({...form, durationHours:Number(e.target.value)})}/>
          <TextField label="เรตติ้ง (0-5)" type="number" value={form.rating ?? ''} onChange={e=>setForm({...form, rating:Number(e.target.value)})}/>
          <TextField label="รอบเวลา (คั่นด้วย ,)" value={(form.startTimes||[]).join(',')} onChange={e=>setForm({...form, startTimes:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})}/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button onClick={handleSave} variant="contained">บันทึก</Button>
      </DialogActions>
    </Dialog>
  )
}
