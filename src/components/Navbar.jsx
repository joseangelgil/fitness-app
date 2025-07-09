import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Stack, Button } from '@mui/material'
import Icon from '../assets/icon2.png'
import { useGlobalContext } from '../utils/context'

function Navbar() {

  const { esPerfilGuardado, activeColor, setMostrarMenuIngredientes } = useGlobalContext()
  const navigate = useNavigate()
  const location = useLocation()

  const comprobarGuardadoPerfil = (ruta) => {
    setMostrarMenuIngredientes(false)
    if(!esPerfilGuardado) {
      if(!confirm('El perfil no se ha guardado, ¿quieres continuar sin guardar?')) return
    }
    navigate(ruta)
  }

  return(    
    <Stack direction='row' mb='30px' alignItems='center'>
      <img src={Icon} alt="Icon" width='40px' height='40px'/>                
      <Button variant='text' color={activeColor.name} onClick={() => comprobarGuardadoPerfil('/')}>INICIO</Button>         
      <Link to='/profile'>
        <Button variant='text' color={activeColor.name} sx={{ boxShadow: location.pathname === '/profile' ? `inset 0 -3px 0 0 ${activeColor.oscuro}`: 'none' }}>PERFIL</Button>
      </Link>
      <Button variant='text' color={activeColor.name} sx={{ boxShadow: location.pathname === '/diet' ? `inset 0 -3px 0 0 ${activeColor.oscuro}`: 'none' }} onClick={() => comprobarGuardadoPerfil('/diet')}>DIETA</Button>           
    </Stack>    
  )
}

export default Navbar