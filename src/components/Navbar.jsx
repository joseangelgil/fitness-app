import { Link } from 'react-router'
import { Stack, Button } from '@mui/material'
import Icon from '../assets/vite.svg'

function Navbar() {
  return(    
    <Stack direction='row' mb='30px'>
      <img src={Icon} alt="Icon" />
      <Link to='/'>
        <Button variant='text' color='primary'>HOME</Button>
      </Link>
      <Link to='/profile'>
        <Button variant='text' color='success'>PROFILE</Button>
      </Link>
      <Link to='/diet'>
        <Button variant='text' color='error'>DIET</Button>
      </Link>
    </Stack>    
  )
}

export default Navbar