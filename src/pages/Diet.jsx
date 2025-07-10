import Navbar from '../components/Navbar'
import DietTable from '../components/DietTable'
import { Box, Button, Typography, Stack } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import Modal from '../components/Modal'
import TotalTable from '../components/TotalTable'

const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

function Diet() {

  const { setDisplay, setComidaOIngrediente, menu, changeActiveButton, chooseVariant, activeWeekDay, activeColor, perfilActivo, setMostrarMenuIngredientes } = useGlobalContext()

  return(
    <Box style={{padding: '10px', minHeight: '100vh'}}>
      <Navbar />
      <Box sx={{
        width: '90%',
        maxWidth: '1400px',
        margin: 'auto'
      }}>
        {weekDays.map((weekDay) => {
          return (
            <Button key={weekDay} value={weekDay} color={activeColor.name} onClick={() => {changeActiveButton(weekDay); setMostrarMenuIngredientes(false);}} variant={chooseVariant(weekDay)} sx={{ margin: '5px', fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>{weekDay}</Button>
          )
        })}
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Button variant='text' color={activeColor.name} sx={{mt: '15px', fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}} onClick={() => {setComidaOIngrediente('nuevaComida'); setDisplay();}}>+ Añadir comida</Button>
          <Typography variant='p' color={activeColor.name} sx={{fontSize: { lg: '1.1rem', xs: '0.9rem'}, mt: '12px'}}>Perfil - {perfilActivo}</Typography>
        </Stack>
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

