
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import DashboardPage from '@/routes/DashboardPage'
import ToursPage from '@/routes/ToursPage'
import HotelsPage from '@/routes/HotelsPage'

export default function App() {
  const { pathname } = useLocation()
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>VibeLink Hub</Typography>
          <Button component={Link} to="/" color="inherit" variant={pathname==='/'?'outlined':'text'}>Dashboard</Button>
          <Button component={Link} to="/tours" color="inherit" variant={pathname==='/tours'?'outlined':'text'}>Tours</Button>
          <Button component={Link} to="/hotels" color="inherit" variant={pathname==='/hotels'?'outlined':'text'}>Hotels</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
        </Routes>
      </Container>
      <Box component="footer" sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="caption">© 2025 No bug just cash — Hackathon MVP</Typography>
      </Box>
    </Box>
  )
}
