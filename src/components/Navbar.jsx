import { Link, useNavigate } from 'react-router-dom'
import { Stack, Button } from '@mui/material'
import Icon from '../assets/vite.svg'
import { useGlobalContext } from '../utils/context'

function Navbar() {

  const { esPerfilGuardado } = useGlobalContext()
  const navigate = useNavigate()

  const comprobarGuardadoPerfil = (ruta) => {
    if(!esPerfilGuardado) {
      if(!confirm('El perfil no se ha guardado, ¿quieres continuar sin guardar?')) return
    }
    navigate(ruta)
  }

  return(    
    <Stack direction='row' mb='30px'>
      <img src={Icon} alt="Icon" />                
      <Button variant='text' color='primary' onClick={() => comprobarGuardadoPerfil('/')}>INICIO</Button>         
      <Link to='/profile'>
        <Button variant='text' color='success'>PERFIL</Button>
      </Link>
      <Button variant='text' color='error' onClick={() => comprobarGuardadoPerfil('/diet')}>DIETA</Button>      
    </Stack>    
  )
}

export default Navbar