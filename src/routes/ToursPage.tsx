
import { useEffect, useMemo, useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { getAll, createItem, updateItem, deleteItem } from '@/api/hotelRooms'
import { useToursStore } from '@/store/useToursStore'
import TourFormDialog from '@/components/TourFormDialog'
import type { Tour } from '@/types/tour'

export default function ToursPage(){
  const { items, load, updateOne, createOne, removeOne } = useToursStore()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Tour|undefined>()
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await getAll()
      const tours = res.filter(x=>x.type==='tour') as Tour[]
      load(tours)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ refresh() }, [])

  const rows = useMemo(()=> items
    .filter(it => {
      const s = q.trim().toLowerCase()
      if (!s) return true
      return (it.name||'').toLowerCase().includes(s) || (it.city||'').toLowerCase().includes(s)
    })
    .map((it, idx)=>({ id: it.id || String(idx), ...it }))
  , [items, q])

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'ชื่อทัวร์', flex: 1, minWidth: 180 },
    { field: 'city', headerName: 'เมือง', width: 140 },
    { field: 'price', headerName: 'ราคา (THB)', width: 140, type: 'number' },
    { field: 'durationHours', headerName: 'ชั่วโมง', width: 120, type: 'number' },
    { field: 'rating', headerName: 'เรตติ้ง', width: 110, type: 'number' },
    {
      field: 'actions', type: 'actions', width: 100, getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="แก้ไข" onClick={() => {
          setEditing(params.row as Tour); setOpen(true)
        }} />,
        <GridActionsCellItem icon={<DeleteIcon />} label="ลบ" onClick={async () => {
          const id = String(params.row.id)
          if (!confirm('ยืนยันลบทัวร์นี้?')) return
          await deleteItem(id)
          removeOne(id)
          await refresh()
        }} />,
      ]
    },
  ]

  const handleCreate = () => { setEditing(undefined); setOpen(true) }

  const handleSubmit = async (payload: Tour) => {
    if (payload.id) {
      const saved = await updateItem(String(payload.id), payload as any)
      updateOne(String(payload.id), saved as any)
    } else {
      const created = await createItem({ ...payload, type: 'tour' } as any)
      createOne(created as any)
    }
    setOpen(false)
    await refresh()
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Tours</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>เพิ่มทัวร์</Button>
      </Stack>
      <TextField placeholder="ค้นหา: ชื่อทัวร์ หรือ เมือง" value={q} onChange={e=>setQ(e.target.value)} />
      <div style={{ height: 560, width: '100%' }}>
        <DataGrid loading={loading} rows={rows} columns={cols} pageSizeOptions={[5,10,20]} initialState={{ pagination:{ paginationModel:{ pageSize: 10 } }}} />
      </div>
      <TourFormDialog open={open} onClose={()=>setOpen(false)} initial={editing} onSubmit={handleSubmit} />
    </Stack>
  )
}
