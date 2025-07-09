import Icon from '../assets/vite.svg'
import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import './Home.css'
import { useGlobalContext } from '../utils/context'

function Home() {

  const { setPerfilActivo, activeColor, setActiveColor, setEsNuevoPerfil, perfiles, setCantidadObjetivo, setMenu, setEsPerfilGuardado } = useGlobalContext()

  const crearNuevoPerfil = () => {
    setPerfilActivo('')
    setEsNuevoPerfil(true)
    setEsPerfilGuardado(false)
    setCantidadObjetivo({kcal: 0, hc: 0, p: 0, g: 0})
    setActiveColor({name: 'primary', oscuro: '#1976D2', claro: '#ADD8E6', suave: '#D6ECFA'})
    setMenu({'Lunes': [], 'Martes': [], 'Miercoles': [], 'Jueves': [], 'Viernes': [], 'Sabado': [], 'Domingo': []})
  }

  return(
    <Stack id='home' className='home' sx={{
      width: '100%',
      height: '100vh',
      fontSize: '2rem',
      backgroundColor: `${perfiles.length ? activeColor.claro : '#ADD8E6'}`,
      color: `${perfiles.length ? activeColor.oscuro : '#1976D2'}`,
      textAlign: 'center',
      padding: '30px'
    }}>
      {/* <img src={Icon} alt="Icon" style={{width: '10%', margin: '0 auto'}}/> */}
      <Typography variant='h1' sx={{fontSize: {xs: '2.8rem', lg: '5rem'}}}>¡Bienvenid@ a Fitness App!</Typography>    
      { perfiles.length ? 
        <Stack  className='home' sx={{
          height: '50%',
          fontSize: '2rem',
          backgroundColor: `${activeColor.claro}`,
          color: `${activeColor.oscuro}`,
          textAlign: 'center',
          mt: '15px'}}>
          <Typography variant='p' sx={{fontSize: {xs: '1.7rem', lg: '3rem'}}}>Selecciona tu perfil:</Typography>   
          <ul>
            {perfiles.map(perfil => {
              return (<li key={perfil} onClick={() => {setPerfilActivo(perfil); setEsNuevoPerfil(false); setEsPerfilGuardado(true)}}><Link className='link' to='/profile' style={{color: `${activeColor.oscuro}`}}>{perfil}</Link></li>)
            })}
          </ul>
          <Typography variant='p' sx={{fontSize: {xs: '1.7rem', lg: '3rem'}}}>o</Typography>
          <Typography variant='p'><Link className='link' to='/profile' style={{color: `${activeColor.oscuro}`}} onClick={() => crearNuevoPerfil()}>Crea uno nuevo</Link></Typography>
        </Stack> :
        <Typography variant='p' className='home-p'><Link className='link' to='/profile' style={{color: '#1976D2'}} onClick={() => crearNuevoPerfil()}>Crea tu perfil</Link></Typography>
      }
      
    </Stack>
  )
}

export default Home