import Navbar from '../components/Navbar'
import DietTable from '../components/DietTable'
import { Box, Button, Typography } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import Modal from '../components/Modal'
import TotalTable from '../components/TotalTable'

const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

function Diet() {

  const { setDisplay, setComidaOIngrediente, menu, changeActiveButton, chooseVariant, activeWeekDay, activeColor, perfilActivo, setMostrarMenuIngredientes } = useGlobalContext()

  return(
    <Box style={{padding: '10px', position: 'relative', minHeight: '100vh'}}>
      <Typography variant='p' color={activeColor.name} sx={{position: 'absolute', top: {xs: '45px', sm: '10px'}, right: '10px', fontSize: { lg: '1.1rem', xs: '0.9rem'}}}>Perfil - {perfilActivo}</Typography>
      <Navbar />
      <Box sx={{
        width: '90%',
        maxWidth: '1400px',
        margin: 'auto'
      }}>
        {weekDays.map((weekDay) => {
          return (
            <Button key={weekDay} value={weekDay} color={activeColor.name} onClick={() => changeActiveButton(weekDay)} variant={chooseVariant(weekDay)} sx={{ margin: '5px', fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>{weekDay}</Button>
          )
        })}
        <Button variant='text' color={activeColor.name} sx={{display: 'block', mt: '15px', fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}} onClick={() => {setComidaOIngrediente('nuevaComida'); setDisplay(); setMostrarMenuIngredientes(false)}}>+ Añadir comida</Button>
        {menu[activeWeekDay].map(comida => {
            return (
              <DietTable key={comida.id} comidaId={comida.id} name={comida.name} time={comida.time} ingredientes={comida.ingredientes} macros={comida.macros}/>
            )
          }
        )}        
      <TotalTable />
      </Box>
      <Modal />
    </Box>
  )
}

export default Diet

