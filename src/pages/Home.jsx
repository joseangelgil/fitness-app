import Icon from '../assets/vite.svg'
import { Link } from 'react-router'
import { Stack, Typography } from '@mui/material'
import './Home.css'
import { useGlobalContext } from '../utils/context'
import { useState, useEffect } from 'react'

function Home() {

  const { setPerfilActivo } = useGlobalContext()
  const [ perfiles, setPerfiles ] = useState(['Perfil1', 'Perfil2', 'Perfil3', 'Perfil4'])

  const crearNuevoPerfil = () => {
    setPerfiles([...perfiles, 'perfil5'])
    setPerfilActivo('')
  }

  return(
    <Stack id='home' gap='20px' justifyContent='center' sx={{
      width: '100%',
      height: '100vh',
      fontSize: '2rem',
      backgroundColor: '#9c27b0',
      color: 'white',
      textAlign: 'center'
    }}>
      <img src={Icon} alt="Icon" style={{width: '10%', margin: '0 auto'}}/>
      <Typography variant='h1'>¡Bienvenid@ a Fitness App!</Typography>    
      <Typography variant='p'>Selecciona tu perfil:</Typography>   
      <ul>
        {perfiles.map(perfil => {
          return (<li key={perfil} onClick={() => setPerfilActivo(perfil)}><Link className='link' to='/profile'>{perfil}</Link></li>)
        })}
      </ul>
      <Typography variant='p'>o</Typography>
      <Typography variant='p' sx={{cursor: 'pointer'}}><Link className='link' to='/profile'>Crea uno nuevo</Link></Typography>
    </Stack>
  )
}

export default Home