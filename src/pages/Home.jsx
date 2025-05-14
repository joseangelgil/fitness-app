import Icon from '../assets/vite.svg'
import { Link } from 'react-router'
import './Home.css'


function Home() {

  return(
    <div id='home'>
      <img src={Icon} alt="Icon" style={{width: '10%'}}/>
      <h1>Welcome to Fitness App!</h1>    
      <p>Select your profile:</p>   
      <ul>
        <li><Link className='link' to='/profile'>Profile1</Link></li>
        <li><Link className='link' to='/profile'>Profile2</Link></li>
        <li><Link className='link' to='/profile'>Profile3</Link></li>
        <li><Link className='link' to='/profile'>Profile4</Link></li>
      </ul>
      <p>or</p>
      <p style={{cursor: 'pointer'}}><Link className='link' to='/profile'>Create a new one</Link></p>
    </div>
  )
}

export default Home