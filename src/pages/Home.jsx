import Icon from '../assets/vite.svg'
import { Link } from 'react-router'
import { Stack, Typography } from '@mui/material'
import './Home.css'


function Home() {

  return(
    <Stack id='home' gap='20px' justifyContent='center' sx={{
      width: '100%',
      height: '100vh',
      fontSize: '2rem',
      backgroundColor: '#0f144a',
      color: 'white',
      textAlign: 'center'
    }}>
      <img src={Icon} alt="Icon" style={{width: '10%', margin: '0 auto'}}/>
      <Typography variant='h1'>Welcome to Fitness App!</Typography>    
      <Typography variant='p'>Select your profile:</Typography>   
      <ul>
        <li><Link className='link' to='/profile'>Profile1</Link></li>
        <li><Link className='link' to='/profile'>Profile2</Link></li>
        <li><Link className='link' to='/profile'>Profile3</Link></li>
        <li><Link className='link' to='/profile'>Profile4</Link></li>
      </ul>
      <Typography variant='p'>or</Typography>
      <Typography variant='p' style={{cursor: 'pointer'}}><Link className='link' to='/profile'>Create a new one</Link></Typography>
    </Stack>
  )
}

export default Home