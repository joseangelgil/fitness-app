import Navbar from '../components/Navbar'
import { Box } from '@mui/material'
import TarjetaDePerfil from '../components/TarjetaDePerfil'

function Profile() {

  return(
    <Box sx={{padding: '10px'}}>
      <Navbar />
      <TarjetaDePerfil />
    </Box>
  )
}

export default Profile