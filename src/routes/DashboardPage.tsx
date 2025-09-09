
import { useEffect, useMemo, useState } from 'react'
import { Grid, Paper, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import KpiCard from '@/components/KpiCard'
import { getAll } from '@/api/hotelRooms'
import { AnyItem } from '@/api/hotelRooms'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, PieChart, Pie, Cell } from 'recharts'

export default function DashboardPage(){
  const [data, setData] = useState<AnyItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|undefined>()

  const refresh = async () => {
    try{
      setLoading(true); setError(undefined)
      const res = await getAll()
      setData(res)
    }catch(e:any){
      setError(e.message || 'โหลดข้อมูลล้มเหลว')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ refresh() }, [])

  const tours = useMemo(()=> data.filter(x=>x.type==='tour'), [data])
  const hotels = useMemo(()=> data.filter(x=>x.type==='hotel'), [data])

  const avgRating = (arr: AnyItem[]) => {
    const valid = arr.map(x=>Number(x.rating)).filter(n=>!isNaN(n))
    if (!valid.length) return 0
    return (valid.reduce((a,b)=>a+b,0)/valid.length).toFixed(2)
  }

  const barData = useMemo(()=> tours
    .filter(t=>typeof t.price === 'number')
    .sort((a,b)=>(b.price??0)-(a.price??0))
    .slice(0,5)
    .map(t=>({ name: String(t.name).slice(0,16), price: t.price })), [tours])

  const cityCount = useMemo(()=>{
    const map = new Map<string, number>()
    hotels.forEach(h=>{
      const c = String(h.city||'ไม่ระบุ')
      map.set(c, (map.get(c)||0)+1)
    })
    return Array.from(map.entries()).map(([name, value])=>({ name, value }))
  }, [hotels])

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Dashboard</Typography>
        <Tooltip title="รีเฟรช">
          <IconButton onClick={refresh}><RefreshIcon/></IconButton>
        </Tooltip>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="จำนวน Tours" value={tours.length}/></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="จำนวน Hotels" value={hotels.length}/></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Avg Rating Tours" value={avgRating(tours)}/></Grid>
        <Grid item xs={12} sm={6} md={3}><KpiCard label="Avg Rating Hotels" value={avgRating(hotels)}/></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p:2, height: 360 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Top Tours by Price</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <RTooltip />
                <Bar dataKey="price" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p:2, height: 360 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>สัดส่วนโรงแรมตามเมือง</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={cityCount} dataKey="value" nameKey="name" outerRadius={120} label />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {loading && <Typography>กำลังโหลดข้อมูล...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Stack>
  )
}
