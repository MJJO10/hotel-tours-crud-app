
import { Card, CardContent, Typography } from '@mui/material'

export default function KpiCard({ label, value }: { label: string, value: string | number }){
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">{label}</Typography>
        <Typography variant="h5" sx={{ mt: .5 }}>{value}</Typography>
      </CardContent>
    </Card>
  )
}
