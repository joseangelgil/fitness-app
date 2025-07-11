import Icon from '../assets/icon2.png'
import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import './Home.css'
import { useGlobalContext } from '../context'

function Home() {

  const { setPerfilActivo, setActiveColor, setEsNuevoPerfil, perfiles, setCantidadObjetivo, setMenu, setEsPerfilGuardado, activeColor } = useGlobalContext()

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
      backgroundColor: 'white',
      color: '#EB5D45',
      textAlign: 'center',
      padding: '30px'
    }}>
      <img src={Icon} alt="Icon" style={{maxWidth: '320px', maxHeight: '25%', aspectRatio: '1/1', margin: '0 auto'}}/>
      <Typography variant='h1' sx={{fontSize: {xs: '2.8rem', md: '4rem', lg: '5rem'}}}>¡Bienvenid@ a Fitness App!</Typography>    
      { perfiles.length ? 
        <Stack  className='home' sx={{
          height: '50%',
          fontSize: '2rem',
          textAlign: 'center',
          mt: '15px'}}>
          <Typography variant='p' sx={{fontSize: {xs: '1.8rem', md: '2.4rem', lg: '3rem'}}}>Selecciona tu perfil:</Typography>   
          <ul>
            {perfiles.map(perfil => {
              return (
              <li key={perfil} onClick={() => {setPerfilActivo(perfil); setEsNuevoPerfil(false); setEsPerfilGuardado(true)}}>
                <Link className='link' to='/profile' style={{color: `${JSON.parse(localStorage.getItem(`${perfil}-color`)).oscuro}`, opacity: '0.9'}}>{perfil}</Link>
              </li>
              )
            })}
          </ul>
          <Typography variant='p' sx={{fontSize: {xs: '1.8rem', md: '2.4rem', lg: '3rem'}}}>o</Typography>
          <Typography variant='p'><Link className='link' to='/profile' style={{color: '#EB5D45'}} onClick={() => crearNuevoPerfil()}>Crea uno nuevo</Link></Typography>
        </Stack> :
        <Typography variant='p' className='home-p'><Link className='link' to='/profile' style={{color: '#EB5D45'}} onClick={() => crearNuevoPerfil()}>Crea tu perfil</Link></Typography>
      }
      
    </Stack>
  )
}

export default Home