import Navbar from '../components/Navbar'
import { Box, Typography } from '@mui/material'

function Profile() {
  return(
    <Box sx={{padding: '10px'}}>
      <Navbar />
      <Typography variant='h1'>Welcome to Profile!</Typography>
    </Box>
  )
}

export default Profile