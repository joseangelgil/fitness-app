import Navbar from '../components/Navbar'
import { Box, Typography } from '@mui/material'
import TarjetaDePerfil from '../components/TarjetaDePerfil'
import TarjetaDeNuevoPerfil from '../components/TarjetaDeNuevoPerfil'
import { useGlobalContext } from '../utils/context'

function Profile() {

  const { perfilActivo } = useGlobalContext()

  return(
    <Box sx={{padding: '10px'}}>
      <Navbar />
      {/* {perfilActivo && <TarjetaDePerfil />}
      {!perfilActivo && <TarjetaDeNuevoPerfil />} */}
      <TarjetaDePerfil />
    </Box>
  )
}

export default Profile