
import { useEffect, useMemo, useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { getAll, createItem, updateItem, deleteItem } from '@/api/hotelRooms'
import { useHotelsStore } from '@/store/useHotelsStore'
import HotelFormDialog from '@/components/HotelFormDialog'
import type { Hotel } from '@/types/hotel'

export default function HotelsPage(){
  const { items, load, updateOne, createOne, removeOne } = useHotelsStore()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Hotel|undefined>()
  const [loading, setLoading] = useState(false)

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await getAll()
      const hotels = res.filter(x=>x.type==='hotel') as Hotel[]
      load(hotels)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ refresh() }, [])

  const rows = useMemo(()=> items
    .filter(it => {
      const s = q.trim().toLowerCase()
      if (!s) return true
      return (it.name||'').toLowerCase().includes(s) || (it.city||'').toLowerCase().includes(s) || (it.district||'').toLowerCase().includes(s)
    })
    .map((it, idx)=>({ id: it.id || String(idx), ...it }))
  , [items, q])

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'ชื่อโรงแรม', flex: 1, minWidth: 180 },
    { field: 'city', headerName: 'จังหวัด/เมือง', width: 140 },
    { field: 'district', headerName: 'อำเภอ/เขต', width: 140 },
    { field: 'pricePerNight', headerName: 'ราคา/คืน (THB)', width: 160, type: 'number' },
    { field: 'roomsAvailable', headerName: 'ห้องว่าง', width: 120, type: 'number' },
    { field: 'status', headerName: 'สถานะ', width: 120 },
    {
      field: 'actions', type: 'actions', width: 100, getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="แก้ไข" onClick={() => {
          setEditing(params.row as Hotel); setOpen(true)
        }} />,
        <GridActionsCellItem icon={<DeleteIcon />} label="ลบ" onClick={async () => {
          const id = String(params.row.id)
          if (!confirm('ยืนยันลบโรงแรมนี้?')) return
          await deleteItem(id)
          removeOne(id)
          await refresh()
        }} />,
      ]
    },
  ]

  const handleCreate = () => { setEditing(undefined); setOpen(true) }

  const handleSubmit = async (payload: Hotel) => {
    if (payload.id) {
      const saved = await updateItem(String(payload.id), payload as any)
      updateOne(String(payload.id), saved as any)
    } else {
      const created = await createItem({ ...payload, type: 'hotel' } as any)
      createOne(created as any)
    }
    setOpen(false)
    await refresh()
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Hotels</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>เพิ่มโรงแรม</Button>
      </Stack>
      <TextField placeholder="ค้นหา: ชื่อโรงแรม จังหวัด อำเภอ" value={q} onChange={e=>setQ(e.target.value)} />
      <div style={{ height: 560, width: '100%' }}>
        <DataGrid loading={loading} rows={rows} columns={cols} pageSizeOptions={[5,10,20]} initialState={{ pagination:{ paginationModel:{ pageSize: 10 } }}} />
      </div>
      <HotelFormDialog open={open} onClose={()=>setOpen(false)} initial={editing} onSubmit={handleSubmit} />
    </Stack>
  )
}
