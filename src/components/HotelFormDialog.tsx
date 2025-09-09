
import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField, MenuItem } from '@mui/material'
import type { Hotel } from '@/types/hotel'

export default function HotelFormDialog({
  open, onClose, initial, onSubmit
}: {
  open: boolean
  onClose: () => void
  initial?: Hotel
  onSubmit: (data: Hotel) => void
}){
  const [form, setForm] = useState<Hotel>(initial ?? { type: 'hotel', name: '', status: 'active', pricePerNight: 0, roomsAvailable: 1 })

  useEffect(()=>{ if (initial) setForm(initial) }, [initial])

  const handleSave = () => {
    if (!form.name) return alert('กรุณากรอกชื่อโรงแรม')
    if (!form.status) return alert('กรุณาเลือกสถานะ')
    if ((form.pricePerNight ?? 0) <= 0) return alert('กรุณากรอกรายคืนให้ถูกต้อง')
    if ((form.roomsAvailable ?? 0) < 0) return alert('จำนวนห้องต้องไม่ติดลบ')
    if (form.rating && (form.rating < 0 || form.rating > 5)) return alert('เรตติ้งต้องอยู่ระหว่าง 0-5')
    onSubmit(form)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{form.id ? 'แก้ไขโรงแรม' : 'เพิ่มโรงแรม'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="ชื่อโรงแรม *" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField select label="สถานะ *" value={form.status||'active'} onChange={e=>setForm({...form, status:e.target.value as any})}>
            <MenuItem value="active">active</MenuItem>
            <MenuItem value="inactive">inactive</MenuItem>
          </TextField>
          <TextField label="จังหวัด/เมือง" value={form.city||''} onChange={e=>setForm({...form, city:e.target.value})}/>
          <TextField label="อำเภอ/เขต" value={form.district||''} onChange={e=>setForm({...form, district:e.target.value})}/>
          <TextField label="ราคา/คืน (THB) *" type="number" value={form.pricePerNight ?? ''} onChange={e=>setForm({...form, pricePerNight:Number(e.target.value)})}/>
          <TextField label="จำนวนห้องว่าง *" type="number" value={form.roomsAvailable ?? ''} onChange={e=>setForm({...form, roomsAvailable:Number(e.target.value)})}/>
          <TextField label="เรตติ้ง (0-5)" type="number" value={form.rating ?? ''} onChange={e=>setForm({...form, rating:Number(e.target.value)})}/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button onClick={handleSave} variant="contained">บันทึก</Button>
      </DialogActions>
    </Dialog>
  )
}
